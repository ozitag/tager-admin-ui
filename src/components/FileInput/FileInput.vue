<template>
  <div
    :class="[
      'file-input-container',
      {
        'with-captions': withCaptions,
        'is-multiple': multiple && fileList.length > 0,
      },
    ]"
  >
    <Draggable
      v-if="savedFileList.length > 0"
      :class="['file-grid', { 'is-multiple': multiple }]"
      :animation="200"
      :value="savedFileList"
      @input="handleDragAndDropInput"
    >
      <div
        v-for="entry of savedFileList"
        :key="entry.id"
        :class="[
          'file-wrapper',
          { single: !multiple },
          { uploading: entry.status === 'UPLOADING' },
          { error: entry.status === 'ERROR' },
        ]"
        :title="getFileHtmlTitle(entry.file)"
      >
        <div class="file-container">
          <BaseButton
            class="clear-button"
            variant="icon"
            title="Clear"
            @click="clearFile(entry)"
          >
            <SvgIcon name="clear" />
          </BaseButton>

          <div class="file-inner">
            <a :href="entry.file.url" class="file-link" target="_blank">
              <LoadableImage
                v-if="isImage(entry.file)"
                :src="entry.file.url"
                :alt="entry.file.name"
                class="file-image"
              />
              <SvgIcon
                v-else
                class="file-icon"
                :name="getFileIcon(entry.file)"
              />
            </a>

            <div v-if="!isImage(entry.file)" class="file-caption">
              <span class="file-name">{{ entry.file.name }}</span>
              <small class="file-size">
                ({{ getFileSize(entry.file.size) }})
              </small>
            </div>

            <BaseTextArea
              v-if="withCaptions"
              class="caption-text-area"
              :rows="2"
              placeholder="Caption"
              :value="entry.caption || ''"
              @input="handleCaptionChange(entry, $event)"
            />
          </div>
        </div>
      </div>
    </Draggable>

    <div
      v-if="uploadingFileList.length > 0"
      :class="[
        'file-grid',
        { 'is-multiple': multiple, 'is-top-divider': multiple },
      ]"
    >
      <div
        v-for="entry of uploadingFileList"
        :key="entry.id"
        :class="[
          'file-wrapper',
          { single: !multiple },
          { uploading: entry.status === 'UPLOADING' },
          { error: entry.status === 'ERROR' },
        ]"
        :title="getFileHtmlTitle(entry.file)"
      >
        <div class="file-container">
          <BaseButton
            class="clear-button"
            variant="icon"
            title="Clear"
            @click="clearFile(entry)"
          >
            <SvgIcon name="clear" />
          </BaseButton>

          <ProgressBar
            v-if="entry.status === 'UPLOADING'"
            :percent="entry.progress"
            class="upload-progress"
          />
          <div v-else-if="entry.status === 'ERROR'" class="error-message">
            {{ entry.error }}
            <div class="file-caption">
              <span class="file-name">{{ entry.file.name }}</span>
              <small class="file-size">
                ({{ getFileSize(entry.file.size) }})
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="shouldDisplayDropbox"
      ref="dropbox"
      :class="[
        'drop-zone',
        {
          highlight: isDragOver,
          'no-hover': selectedTabId === 'url',
          'is-upload-file': selectedTabId === 'file',
        },
      ]"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @dragleave="handleDragLeave"
    >
      <TabList
        class="file-tab-list"
        :tab-list="tabList"
        :selected-tab-id="selectedTabId"
        @tab:update="handleTabUpdate"
      />

      <UploadFileFromUrlForm
        v-if="selectedTabId === 'url'"
        @change="handleUploadFromUrlChange"
      />

      <div v-else-if="selectedTabId === 'file'">
        <div class="upload-message-container">
          <svg-icon name="upload" />
          <p>{{ computedPlaceholderMessage }}</p>
        </div>

        <label class="file-input-label">
          <input
            ref="fileInputRef"
            type="file"
            class="visually-hidden"
            :accept="acceptableMimeTypes"
            :multiple="multiple"
            @change="handleChange"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Draggable from 'vuedraggable';

import {
  computed,
  defineComponent,
  ref,
  SetupContext,
} from '@vue/composition-api';

import {
  createId,
  FileObjectSchema,
  FileType,
  getMessageFromError,
  isNotNullish,
  notEmpty,
  Nullable,
  RequestError,
  upload,
  z,
} from '@tager/admin-services';

import { ARCHIVE_ACCEPT } from '../../constants/common';

import SvgIcon from '../SvgIcon';
import BaseButton from '../BaseButton';
import BaseTextArea from '../BaseTextArea';
import ProgressBar from '../ProgressBar';
import LoadableImage from '../LoadableImage';
import TabList from '../TabList/TabList.vue';
import UploadFileFromUrlForm from '../UploadFileFromUrlForm';

import { getFileIconName } from './FileInput.helpers';
import useTranslation from '../../hooks/useTranslation';

const SingleFileInputValueSchema = z.object({
  id: z.string(),
  file: FileObjectSchema,
  caption: z.string().nullable().optional(),
});

type SingleFileInputValueType = z.infer<typeof SingleFileInputValueSchema>;

const FileInputValueSchema = z.union([
  SingleFileInputValueSchema,
  z.array(SingleFileInputValueSchema),
]);

type FileInputValueType = z.infer<typeof FileInputValueSchema>;

type UploadingSingleFileInputValueType = SingleFileInputValueType & {
  nativeFile: File;
  xhr: XMLHttpRequest;
  status: 'UPLOADING' | 'ERROR';
  progress: number;
  error: Nullable<string>;
};

type TabListType = {
  id: string;
  label: string;
};

interface Props {
  value: FileInputValueType | null;
  multiple: boolean;
  withCaptions: boolean;
  accept: string | null;
  placeholderMessage: string | null;
  maxFileCount: number | null;
  fileType: 'image' | 'archive' | null;
  scenario: string | null;
}

export default defineComponent<Props>({
  name: 'FileInput',
  components: {
    Draggable,
    SvgIcon,
    BaseButton,
    ProgressBar,
    BaseTextArea,
    LoadableImage,
    TabList,
    UploadFileFromUrlForm,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: [Object, Array],
      validator(
        value: null | Record<string, unknown> | Array<Record<string, unknown>>
      ) {
        return !value || FileInputValueSchema.check(value);
      },
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    withCaptions: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: null,
    },
    placeholderMessage: {
      type: String,
      default: null,
    },
    maxFileCount: {
      type: Number,
      default: null,
    },
    fileType: {
      type: String,
      validator: (value: string) => ['image', 'archive'].includes(value),
      default: null,
    },
    scenario: {
      type: String,
      default: null,
    },
  },
  watch: {
    $props: {
      immediate: true,
      handler() {
        const isCorrect =
          (Array.isArray(this.value) && this.multiple) ||
          (!Array.isArray(this.value) && !this.multiple);

        if (!isCorrect) {
          console.error(
            'Incompatible props: "value" and "multiple"',
            this.value,
            this.multiple
          );
        }
      },
    },
  },
  setup(props: Props, context: SetupContext) {
    const { t } = useTranslation(context);

    const fileInputRef = ref<HTMLInputElement | null>(null);
    const isDragOver = ref<boolean>(false);
    const uploadingFileList = ref<Array<UploadingSingleFileInputValueType>>([]);
    const selectedTabId = ref<string>('file');
    const tabList = ref<Array<TabListType>>([
      {
        id: 'url',
        label: t('ui:fileInput.uploadFileByURL'),
      },
      {
        id: 'file',
        label: t('ui:fileInput.uploadFile'),
      },
    ]);

    const savedFileList = computed<Array<SingleFileInputValueType>>(() => {
      return props.multiple
        ? (props.value as Array<SingleFileInputValueType>)
        : [props.value as SingleFileInputValueType | null].filter(isNotNullish);
    });

    const fileList = computed<
      Array<SingleFileInputValueType | UploadingSingleFileInputValueType>
    >(() => {
      return [...savedFileList.value, ...uploadingFileList.value];
    });

    const shouldDisplayDropbox = computed<boolean>(() => {
      if (props.multiple && typeof props.maxFileCount === 'number') {
        return savedFileList.value.length < props.maxFileCount;
      }
      if (!props.multiple) {
        return (
          savedFileList.value.length === 0 &&
          uploadingFileList.value.length === 0
        );
      }
      return true;
    });

    const acceptableMimeTypes = computed<string | undefined>(() => {
      if (props.accept) return props.accept;
      if (props.fileType === 'image') {
        return 'image/*';
      }
      if (props.fileType === 'archive') {
        return ARCHIVE_ACCEPT;
      }
      return undefined;
    });

    const computedPlaceholderMessage = computed<string>(() => {
      if (props.placeholderMessage) {
        props.placeholderMessage;
      }

      switch (props.fileType) {
        case 'image':
          return t('ui:fileInput.dragAndDropAnImageHereOrClick');
        case 'archive':
          return t('ui:fileInput.dragAndDropAnArchiveHereOrClick');
        default:
          return t('ui:fileInput.dragAndDropAFileHereOrClick');
      }
    });

    function emitChangeEvent(newFiles: Array<SingleFileInputValueType>) {
      const newValue = props.multiple ? newFiles : newFiles[0];
      context.emit('change', newValue ?? null);
    }

    function createUploadingFile(
      nativeFile: File
    ): UploadingSingleFileInputValueType {
      return {
        id: createId(),
        file: {
          id: String(Math.round(Math.random() * Number.MAX_SAFE_INTEGER)),
          url: '',
          name: nativeFile.name,
          size: nativeFile.size ?? 0,
          mime: nativeFile.type ?? '',
        },
        caption: null,
        nativeFile,
        xhr: new XMLHttpRequest(),
        status: 'UPLOADING',
        progress: 1,
        error: null,
      };
    }

    function getUploadErrorMessage(error: Error) {
      if (error instanceof RequestError) {
        switch (error.status) {
          case 413:
            return t('ui:fileInput.fileTooLarge');
          case 404:
            return t('ui:fileInput.uploadEndpointIsNotFound');
        }
      }
      return getMessageFromError(error) || 'Error';
    }

    function removeFileExtension(value: string): string {
      const index = value.lastIndexOf('.');
      return index === -1 ? value : value.slice(0, index);
    }

    function handleFiles(pendingFileList: Nullable<FileList>): void {
      const fileArray = pendingFileList ? [...pendingFileList] : [];
      uploadingFileList.value.push(...fileArray.map(createUploadingFile));

      Promise.all(
        uploadingFileList.value.map((uploadingValue) => {
          return upload<FileType>({
            file: uploadingValue.nativeFile,
            params: props.scenario ? { scenario: props.scenario } : undefined,
            onProgress: ({ progress }) => {
              uploadingValue.progress = progress * 100;
            },
            xhr: uploadingValue.xhr,
          })
            .then((savedFile) => {
              const newValue: SingleFileInputValueType = {
                id: createId(),
                file: savedFile,
                caption: removeFileExtension(savedFile.name),
              };

              const newValues: Array<SingleFileInputValueType> = [
                ...savedFileList.value,
                newValue,
              ].filter(notEmpty);

              emitChangeEvent(newValues);

              uploadingFileList.value = uploadingFileList.value.filter(
                (value) => value.id !== uploadingValue.id
              );
            })
            .catch((error) => {
              uploadingValue.status = 'ERROR';
              uploadingValue.error = getUploadErrorMessage(error);
            });
        })
      ).finally(() => {
        /** Clear value of file input */
        if (fileInputRef.value) {
          fileInputRef.value.value = '';
        }
      });
    }

    function handleChange(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      handleFiles(inputElement.files);
    }

    function handleUploadFromUrlChange(savedFile: FileType) {
      const newValue: SingleFileInputValueType = {
        id: createId(),
        file: savedFile,
        caption: removeFileExtension(savedFile.name),
      };

      const newValues: Array<SingleFileInputValueType> = [
        ...savedFileList.value,
        newValue,
      ].filter(notEmpty);

      emitChangeEvent(newValues);
    }

    function handleDragEnter(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      highlightDropArea();
    }

    function handleDragOver(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
      highlightDropArea();
    }

    function handleDragLeave(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      unhighlightDropArea();
    }

    function handleDrop(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      unhighlightDropArea();
      const dataTransfer = event.dataTransfer;
      handleFiles(dataTransfer?.files ?? null);
    }

    function clearFile(valueToClear: UploadingSingleFileInputValueType) {
      if (valueToClear.status === 'UPLOADING') {
        valueToClear.xhr.abort();
      }
      if (valueToClear.status === 'ERROR') {
        uploadingFileList.value = uploadingFileList.value.filter(
          (value) => value.id !== valueToClear.id
        );
      } else {
        const newFiles = savedFileList.value.filter(
          (value) => value.id !== valueToClear.id
        );
        emitChangeEvent(newFiles);
      }
    }

    function handleCaptionChange(
      updatedValue: SingleFileInputValueType,
      newCaption: string
    ): void {
      updatedValue.caption = newCaption;
      emitChangeEvent(savedFileList.value);
    }

    function getFileSize(bytes: number): string {
      const unitList = ['bytes', 'kB', 'MB'];
      let fileSize = bytes;
      let unitIndex = 0;

      while (fileSize > 1024) {
        fileSize = fileSize / 1024;
        unitIndex += 1;
      }

      const fractionDigitCount = fileSize < 10 ? 2 : fileSize < 100 ? 1 : 0;

      return [fileSize.toFixed(fractionDigitCount), unitList[unitIndex]].join(
        ' '
      );
    }

    function getFileHtmlTitle(file: FileType): string {
      return [
        `Name: ${file.name}`,
        `Size: ${getFileSize(file.size)} (${file.size} bytes)`,
        `MIME type: ${file.mime}`,
      ].join('\n');
    }

    function isImage(file: FileType): boolean {
      return file.mime.startsWith('image/');
    }

    function getFileIcon(file: FileType): string {
      return getFileIconName(file);
    }

    function highlightDropArea(): void {
      isDragOver.value = true;
    }

    function unhighlightDropArea() {
      isDragOver.value = false;
    }

    function handleTabUpdate({ tabId }: { tabId: string }): void {
      selectedTabId.value = tabId;
    }

    function handleDragAndDropInput(
      sortedFileList: Array<SingleFileInputValueType>
    ) {
      emitChangeEvent(sortedFileList);
    }

    return {
      tabList,
      fileList,
      isDragOver,
      fileInputRef,
      selectedTabId,
      acceptableMimeTypes,
      shouldDisplayDropbox,
      computedPlaceholderMessage,
      handleChange,
      handleTabUpdate,
      handleCaptionChange,
      handleUploadFromUrlChange,
      handleDragEnter,
      handleDragOver,
      handleDrop,
      handleDragLeave,
      getFileSize,
      isImage,
      getFileIcon,
      getFileHtmlTitle,
      clearFile,
      emitChangeEvent,

      handleDragAndDropInput,

      savedFileList,
      uploadingFileList,
    };
  },
});
</script>

<style scoped lang="scss">
.file-input-container {
  position: relative;
  margin-top: 2.125rem;

  &.with-captions {
    .drop-zone,
    .file-container {
      height: 300px;
    }
  }

  &.is-multiple {
    margin-top: 0;
  }
}
.drop-zone {
  position: relative;
  height: 220px;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: #fff;
  transition: background-color 0.15s linear, box-shadow 0.15s linear;
  border: 1px solid rgba(0, 0, 0, 0.16);

  &:hover {
    background-color: rgba(62, 69, 81, 0.05);

    ::v-deep &:not(.no-hover) [data-ui-tab][data-active] [data-ui-tab-button] {
      background-color: rgba(62, 69, 81, 0.05);
    }
  }

  &.highlight {
    background-color: rgba(62, 69, 81, 0.05);
  }

  &.no-hover:hover {
    background-color: transparent;
  }

  &:not(:first-child) {
    margin-top: 1rem;
  }

  &.is-upload-file {
    border-top-right-radius: 0;
  }
}

.upload-message-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    display: block;
    width: 60px;
    height: auto;
    fill: #bbb;
  }

  p {
    color: #bbb;
  }
}

.file-input-label {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
}

.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}

.file-grid {
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;

  &.is-multiple {
    margin-bottom: 3.25rem;
  }
}

.file-wrapper {
  flex: 0 0 25%;
  padding: 1rem;

  @media (max-width: 1600px) {
    flex: 0 0 33.3333333333%;
  }

  &.single {
    flex-basis: 100%;
  }

  &.error {
    .file-container {
      border-color: var(--danger);
    }

    .clear-button {
      background-color: rgba(220, 53, 69, 0.2);
      color: var(--danger);
      border-color: rgba(220, 53, 69, 0.4);
      box-shadow: 0 3px 2px -1px rgba(220, 53, 69, 0.2),
        0px 1px 5px 0px rgba(220, 53, 69, 0.14),
        0px 1px 5px 0px rgba(220, 53, 69, 0.12);
    }

    .file-size {
      color: rgba(220, 53, 69, 0.7);
    }
  }
}

.file-container {
  padding: 0.6rem;

  height: 220px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 200px;
  border: 1px solid #ccc;

  .clear-button {
    position: absolute;
    right: 3px;
    top: 2px;
    background-color: #f9fafb;
    transition: transform 0.1s ease-in-out;
    border: 1px solid #ddd;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.2),
        0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
  }

  img {
    width: auto;
    height: 100%;
  }

  .upload-progress {
    width: 90%;
  }

  .caption-text-area {
    resize: none;
    margin-top: 0.5rem;

    &::placeholder {
      color: #bbb;
    }
  }

  .error-message {
    color: var(--danger);
  }
}

.file-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.file-link {
  display: flex;
  justify-content: center;
  flex: 1;
  min-height: 1px;
}

.file-icon {
  display: block;
  height: 100%;
  width: auto;
}

.file-caption {
  margin-top: 0.5rem;

  .file-name {
    white-space: nowrap;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .file-size {
    display: block;
    margin-top: 0.2rem;
    color: #999;
  }
}

.file-image {
  object-fit: contain;
}

.file-tab-list {
  position: absolute;
  top: 0;
  right: -1px;
  transform: translate(0, -100%);

  margin: 0;
  border-bottom: none;

  ::v-deep [data-ui-tab] {
    border-top: none;
    margin-bottom: 0;

    [data-ui-tab-button] {
      padding: 7px;
      border: 1px solid transparent;
      border-bottom: none;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      transition: background-color 0.15s linear;
    }

    &[data-active] {
      background-color: #fff;
      border-top: none;

      [data-ui-tab-button] {
        border: 1px solid #ccc;
        border-bottom: none;
        padding: 7px;
      }
    }
  }
}

.is-top-divider {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -1.125rem;
    left: 1rem;
    right: 1rem;
    height: 1px;
    background-color: #eee;
  }
}
</style>
