<template>
  <div :class="['file-input-container', { 'with-captions': withCaptions }]">
    <div v-if="fileList.length > 0" class="file-grid">
      <div
        v-for="entry of fileList"
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
          <base-button
            class="clear-button"
            variant="icon"
            title="Clear"
            @click="clearFile(entry)"
          >
            <svg-icon name="clear" />
          </base-button>

          <progress-bar
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
          <div v-else class="file-inner">
            <a :href="entry.file.url" class="file-link" target="_blank">
              <loadable-image
                v-if="isImage(entry.file)"
                :src="entry.file.url"
                :alt="entry.file.name"
                class="file-image"
              />
              <svg-icon
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

            <base-text-area
              v-if="withCaptions"
              class="caption-text-area"
              rows="2"
              placeholder="Caption"
              :value="entry.caption || ''"
              @input="handleCaptionChange(entry, $event)"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="shouldDisplayDropbox"
      ref="dropbox"
      :class="[
        'drop-zone',
        isDragOver ? 'highlight' : null,
        { 'no-hover': selectedTabId === 'url' },
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
            ref="fileInput"
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
import Vue from 'vue';
import { PropValidator } from 'vue/types/options';
import {
  createId,
  FileObjectSchema,
  FileType,
  getMessageFromError,
  notEmpty,
  Nullable,
  RequestError,
  upload,
  z,
} from '@tager/admin-services';

import { ARCHIVE_ACCEPT } from '../../constants/common';

import SvgIcon from '../SvgIcon';
import BaseButton from '../BaseButton/index.vue';
import BaseTextArea from '../BaseTextArea';
import ProgressBar from '../ProgressBar/index.vue';
import LoadableImage from '../LoadableImage/index.vue';
import TabList from '../TabList/TabList.vue';
import UploadFileFromUrlForm from '../UploadFileFromUrlForm';

import { getFileIconName } from './FileInput.helpers';

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

export default Vue.extend({
  name: 'FileInput',
  components: {
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
      required: true,
      validator(value) {
        return !value || FileInputValueSchema.check(value);
      },
    } as PropValidator<FileInputValueType>,
    multiple: Boolean,
    withCaptions: Boolean,
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
      validator(value) {
        return !value || ['image', 'archive'].includes(value);
      },
      default: null,
    },
    scenario: {
      type: String,
      default: null,
    },
  },
  data(): {
    isDragOver: boolean;
    uploadingFileList: Array<UploadingSingleFileInputValueType>;
    tabList: Array<TabListType>;
    selectedTabId: string;
  } {
    return {
      isDragOver: false,
      uploadingFileList: [],
      selectedTabId: 'file',
      tabList: [
        {
          id: 'url',
          label: 'Upload file by URL',
        },
        {
          id: 'file',
          label: 'Upload file',
        },
      ],
    };
  },
  computed: {
    savedFileList(): Array<SingleFileInputValueType> {
      return this.multiple
        ? (this.value as Array<SingleFileInputValueType>)
        : ([this.value].filter(Boolean) as Array<SingleFileInputValueType>);
    },
    fileList(): Array<
      SingleFileInputValueType | UploadingSingleFileInputValueType
    > {
      return [...this.savedFileList, ...this.uploadingFileList];
    },
    shouldDisplayDropbox(): boolean {
      if (this.multiple && typeof this.maxFileCount === 'number') {
        return this.fileList.length < this.maxFileCount;
      }

      if (!this.multiple) {
        return this.fileList.length === 0;
      }

      return true;
    },
    acceptableMimeTypes(): string | undefined {
      if (this.accept) return this.accept;

      if (this.fileType === 'image') {
        return 'image/*';
      }

      if (this.fileType === 'archive') {
        return ARCHIVE_ACCEPT;
      }

      return undefined;
    },
    computedPlaceholderMessage(): string {
      if (this.placeholderMessage) return this.placeholderMessage;

      switch (this.fileType) {
        case 'image':
          return 'Drag and drop an image here or click';
        case 'archive':
          return 'Drag and drop an archive here or click';
        default:
          return 'Drag and drop a file here or click';
      }
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
  methods: {
    handleUploadFromUrlChange(savedFile: FileType) {
      const newValue: SingleFileInputValueType = {
        id: createId(),
        file: savedFile,
        caption: null,
      };

      const newValues: Array<SingleFileInputValueType> = [
        ...this.savedFileList,
        newValue,
      ].filter(notEmpty);

      this.emitChangeEvent(newValues);
    },
    handleTabUpdate({ tabId }: { tabId: string }): void {
      this.selectedTabId = tabId;
    },
    handleChange(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      this.handleFiles(inputElement.files);
    },
    highlightDropArea(): void {
      this.isDragOver = true;
    },
    unhighlightDropArea() {
      this.isDragOver = false;
    },
    handleFiles(fileList: Nullable<FileList>): void {
      const fileArray = fileList ? [...fileList] : [];
      this.uploadingFileList.push(...fileArray.map(this.createUploadingFile));

      Promise.all(
        this.uploadingFileList.map((uploadingValue) => {
          return upload<FileType>({
            file: uploadingValue.nativeFile,
            params: this.scenario ? { scenario: this.scenario } : undefined,
            onProgress: ({ progress }) => {
              uploadingValue.progress = progress * 100;
            },
            xhr: uploadingValue.xhr,
          })
            .then((savedFile) => {
              console.log('Uploaded file: ', savedFile);
              const newValue: SingleFileInputValueType = {
                id: createId(),
                file: savedFile,
                caption: null,
              };

              const newValues: Array<SingleFileInputValueType> = [
                ...this.savedFileList,
                newValue,
              ].filter(notEmpty);

              this.emitChangeEvent(newValues);

              this.uploadingFileList = this.uploadingFileList.filter(
                (value) => value.id !== uploadingValue.id
              );
            })
            .catch((error) => {
              uploadingValue.status = 'ERROR';
              uploadingValue.error = this.getUploadErrorMessage(error);
            });
        })
      ).finally(() => {
        /** Clear value of file input */
        if (this.$refs.fileInput) {
          (this.$refs.fileInput as HTMLInputElement).value = '';
        }
      });
    },
    getUploadErrorMessage(error: Error) {
      if (error instanceof RequestError) {
        switch (error.status) {
          case 413:
            return 'File too large';
          case 404:
            return 'Upload endpoint is not found';
        }
      }

      return getMessageFromError(error) || 'Error';
    },
    handleDragEnter(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();

      this.highlightDropArea();
    },
    handleDragOver(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }

      this.highlightDropArea();
    },
    handleDragLeave(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();

      this.unhighlightDropArea();
    },
    handleDrop(event: DragEvent) {
      event.stopPropagation();
      event.preventDefault();

      this.unhighlightDropArea();

      const dataTransfer = event.dataTransfer;

      this.handleFiles(dataTransfer?.files ?? null);
    },
    clearFile(valueToClear: UploadingSingleFileInputValueType) {
      if (valueToClear.status === 'UPLOADING') {
        valueToClear.xhr.abort();
      }
      if (valueToClear.status === 'ERROR') {
        this.uploadingFileList = this.uploadingFileList.filter(
          (value) => value.id !== valueToClear.id
        );
      } else {
        const newFiles = this.savedFileList.filter(
          (value) => value.id !== valueToClear.id
        );
        this.emitChangeEvent(newFiles);
      }
    },
    handleCaptionChange(
      updatedValue: SingleFileInputValueType,
      newCaption: string
    ): void {
      updatedValue.caption = newCaption;
      this.emitChangeEvent(this.savedFileList);
    },
    emitChangeEvent(newFiles: Array<SingleFileInputValueType>) {
      const newValue = this.multiple ? newFiles : newFiles[0];

      this.$emit('change', newValue);
    },
    getFileSize(bytes: number): string {
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
    },
    getFileHtmlTitle(file: FileType): string {
      return [
        `Name: ${file.name}`,
        `Size: ${this.getFileSize(file.size)} (${file.size} bytes)`,
        `MIME type: ${file.mime}`,
      ].join('\n');
    },
    isImage(file: FileType): boolean {
      return file.mime.startsWith('image/');
    },
    getFileIcon(file: FileType): string {
      return getFileIconName(file);
    },
    createUploadingFile(nativeFile: File): UploadingSingleFileInputValueType {
      return {
        id: createId(),
        file: {
          id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
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
    },
  },
});
</script>

<style scoped lang="scss">
.file-input-container {
  position: relative;
  &.with-captions {
    .drop-zone,
    .file-container {
      height: 300px;
    }
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
}

.file-wrapper {
  flex: 0 0 25%;
  padding: 1rem;

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
</style>
