<template>
  <div>
    <div class="file-grid">
      <div
        v-for="file of fileList"
        :key="file.id"
        class="file-wrapper"
        :title="getFileHtmlTitle(file)"
      >
        <div class="file-container">
          <base-button
            class="clear-button"
            variant="icon"
            title="Clear"
            @click="clearFile(file)"
          >
            <svg-icon name="clear" />
          </base-button>

          <progress-bar
            v-if="file.status === 'UPLOADING'"
            :percent="file.progress"
            class="upload-progress"
          />
          <div v-else class="file-inner">
            <a :href="file.url" class="file-link" target="_blank">
              <img v-if="isImage(file)" :src="file.url" />
              <svg-icon v-else class="file-icon" :name="getFileIcon(file)" />
            </a>

            <span v-if="!isImage(file)" class="file-caption">
              {{ file.name }}
              <br />
              ({{ getFileSize(file.size) }})
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="shouldDisplayDropbox"
      ref="dropbox"
      :class="['drop-zone', isDragOver ? 'highlight' : null]"
      @dragenter="handleDragEnter"
      @dragover="handleDragOver"
      @drop="handleDrop"
      @dragleave="handleDragLeave"
    >
      <div class="upload-message-container">
        <svg-icon name="upload" />
        <p>Drag and drop a file here or click</p>
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
</template>

<script lang="js">
import Vue from 'vue';
import { upload } from '@tager/admin-services';

import SvgIcon from '@/components/SvgIcon';
import BaseButton from '@/components/BaseButton';
import ProgressBar from '@/components/ProgressBar';

import { getFileIconName, logPropsValidationErrors, validateValue } from './FileInput.helpers';
import { ARCHIVE_ACCEPT } from '@/constants/common';

export default Vue.extend({
  name: 'FileInput',
  components: { SvgIcon, BaseButton, ProgressBar },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      required: true,
      validator(value) {
        return validateValue(value);
      }
    },
    multiple: Boolean,
    accept: {
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
    }
  },
  data() {
    return {
      isDragOver: false,
      uploadingFileList: [],
    };
  },
  computed: {
    savedFileList() {
      return this.multiple ? this.value : [this.value].filter(Boolean);
    },
    fileList() {
      return [...this.savedFileList, ...this.uploadingFileList];
    },
    shouldDisplayDropbox() {
      if (this.multiple && typeof this.maxFileCount === 'number') {
        return this.fileList.length < this.maxFileCount;
      }

      if (!this.multiple) {
        return this.fileList.length === 0;
      }

      return true;
    },
    acceptableMimeTypes() {
      if (this.accept) return this.accept;

      if (this.fileType === 'image') {
        return 'image/*';
      }

      if (this.fileType === 'archive') {
        return ARCHIVE_ACCEPT;
      }

      return undefined;
    }
  },
  watch: {
    $props: {
      immediate: true,
      handler() {
        logPropsValidationErrors({ value: this.value, multiple: this.multiple  })
      }
    }
  },
  methods: {
    handleChange(event) {
      this.handleFiles(event.target.files);
    },
    highlightDropArea() {
      this.isDragOver = true;
    },
    unhighlightDropArea() {
      this.isDragOver = false;
    },
    handleFiles(fileList) {
      const fileArray = fileList ? [...fileList] : [];
      console.log('Files: ', fileArray);

      this.uploadingFileList.push(...fileArray.map(this.createUploadingFile));

      console.log('Uploading files: ', this.uploadingFileList);

      Promise.all(
        this.uploadingFileList.map(uploadingFile => {
          return upload({
              file: uploadingFile.nativeFile,
              params: this.scenario ? { scenario: this.scenario } : null,
              onProgress: ({ progress }) => {
                uploadingFile.progress = progress * 100;
              },
              xhr: uploadingFile.xhr,
            })
            .then(savedFile => {
              console.log('Uploaded file: ', savedFile);
              const newFiles = [...this.savedFileList, savedFile].filter(Boolean);

              this.emitChangeEvent(newFiles);
            })
            .catch(console.error)
            .finally(() => {
              URL.revokeObjectURL(uploadingFile.url);
              console.log('remove file', this.uploadingFileList, uploadingFile);
              this.uploadingFileList = this.uploadingFileList.filter(file => file.id !== uploadingFile.id);
              console.log('remove success', this.uploadingFileList);

            });
        })
      )
        .finally(() => {
          /** Clear value of file input */
          if (this.$refs.fileInput) {
            this.$refs.fileInput.value = '';
          }
        });
    },
    handleDragEnter(event) {
      event.stopPropagation();
      event.preventDefault();

      this.highlightDropArea();
    },
    handleDragOver(event) {
      event.stopPropagation();
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }

      this.highlightDropArea();
    },
    handleDragLeave(event) {
      event.stopPropagation();
      event.preventDefault();

      this.unhighlightDropArea();
    },
    handleDrop(event) {
      event.stopPropagation();
      event.preventDefault();

      this.unhighlightDropArea();

      const dataTransfer = event.dataTransfer;

      this.handleFiles(dataTransfer?.files ?? null);
    },
    clearFile(fileToClear) {
      if (fileToClear.status === 'UPLOADING') {
        fileToClear.xhr.abort();
      } else {
        const newFiles = this.savedFileList.filter(file => file.id !== fileToClear.id);
        this.emitChangeEvent(newFiles);
      }
    },
    emitChangeEvent(newFiles) {
      const newValue = this.multiple ? newFiles : newFiles[0];

      this.$emit('change', newValue);
    },
    getFileSize(bytes) {
      const unitList = ['bytes', 'kB', 'MB'];
      let fileSize = bytes
      let unitIndex = 0;

      while (fileSize > 1024) {
        fileSize = fileSize / 1024;
        unitIndex += 1;
      }

      const fractionDigitCount = fileSize < 10 ? 2 : fileSize < 100 ? 1 : 0;

      return [fileSize.toFixed(fractionDigitCount), unitList[unitIndex]].join(' ') ;
    },
    getFileCaption(file) {
      return `${file.name} (${this.getFileSize(file.size)})`;
    },
    getFileHtmlTitle(file) {
      return [
        `Name: ${file.name}`,
        `Size: ${this.getFileSize(file.size)} (${file.size} bytes)`,
        `MIME type: ${file.mime}`
      ].join('\n');
    },
    isImage(file) {
      return file.mime.startsWith('image/')
    },
    getFileIcon(file) {
      return getFileIconName(file);
    },
    createUploadingFile(nativeFile) {
      return {
        id: Math.round(Math.random() * Number.MAX_SAFE_INTEGER),
        url: '',
        name: nativeFile.name,
        size: nativeFile.size ?? 0,
        mime: nativeFile.type ?? '',

        nativeFile,
        xhr: new XMLHttpRequest(),
        status: 'UPLOADING',
        progress: 1,
      }
    }
  }
});
</script>

<style scoped lang="scss">
.drop-zone {
  position: relative;
  height: 250px;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 5px 10px;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: background-color 0.15s linear;
  margin-bottom: 1rem;

  &:hover {
    background-color: rgba(62, 69, 81, 0.05);
  }

  &.highlight {
    background-color: rgba(62, 69, 81, 0.05);
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
  margin-bottom: 1rem;
}

.file-wrapper {
  flex: 0 0 25%;
  padding: 1rem;
  display: flex;
}

.file-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 200px;
  border: 1px solid #ccc;

  .clear-button {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #f9fafb;
    transition: transform 0.1s ease-in-out;
    border: 1px solid #ddd;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 3px 2px -1px rgba(0, 0, 0, 0.2),
        0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
  }

  .file-inner {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .file-link {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .file-icon {
    display: block;
    height: 100%;
    width: auto;
  }

  .file-caption {
    display: inline-block;
    /*max-width: 200px;*/
    word-break: break-all;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
  }

  .upload-progress {
    width: 90%;
  }
}
</style>
