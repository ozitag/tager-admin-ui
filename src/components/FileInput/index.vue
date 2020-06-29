<template>
  <div>
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

    <div class="file-grid">
      <div
        v-for="file of files"
        :key="file.id"
        class="file-container"
        :title="getFileHtmlTitle(file)"
      >
        <base-button
          class="clear-button"
          variant="icon"
          title="Clear"
          @click="clearImage(file.id)"
        >
          <svg-icon name="clear" />
        </base-button>

        <a :href="file.url" target="_blank">
          <img v-if="isImage(file)" :src="file.url" />
          <svg-icon v-else class="file-icon" :name="getFileIcon(file)" />
        </a>

        <span v-if="!isImage(file)" class="file-caption">
          {{ getFileCaption(file) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import { upload } from '@tager/admin-services';

import SvgIcon from '@/components/SvgIcon';
import BaseButton from '@/components/BaseButton';

import { getFileIconName } from './FileInput.helpers';

function isFileObject(image) {
  return (
    typeof image === 'object' &&
    typeof image?.id === 'number' &&
    typeof image?.url === 'string' &&
    typeof image?.name === 'string' &&
    typeof image?.size === 'number' &&
    typeof image?.mime === 'string'
  );
}

export default Vue.extend({
  name: 'FileInput',
  components: { SvgIcon, BaseButton },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      required: true,
      validator(value) {
        return Array.isArray(value)
          ? value.every(isFileObject)
          : isFileObject(value) || value === null;
      }
    },
    multiple: Boolean,
    accept: String,
    maxFileCount: Number,
    fileType: {
      type: String,
      validator(value) {
        return !value || ['image'].includes(value);
      }
    },
    scenario: String
  },
  data() {
    return {
      isDragOver: false
    };
  },
  computed: {
    files() {
      if (this.multiple) {
        return this.value;
      } else {
        return [this.value].filter(Boolean);
      }
    },
    shouldDisplayDropbox() {
      if (this.multiple && typeof this.maxFileCount === 'number') {
        return this.files.length < this.maxFileCount;
      }

      if (!this.multiple) {
        return this.files.length === 0;
      }

      return true;
    },
    acceptableMimeTypes() {
      if (this.accept) return this.accept;

      if (this.fileType === 'image') {
        return 'image/*'
      }

      return undefined;
    }
  },
  watch: {
    $props: {
      immediate: true,
      handler() {
        if (this.multiple) {
          if (!Array.isArray(this.value) || !this.value.every(isFileObject)) {
            const message = JSON.stringify(
              {
                message: 'ImageInput: value should be Array<ImageType>',
                value: this.value,
                multiple: this.multiple
              },
              null,
              4
            );
            console.error(message);
          }
        } else {
          if (!isFileObject(this.value) && this.value !== null) {
            const message = JSON.stringify(
              {
                message: 'ImageInput: value should be ImageType or null',
                value: this.value,
                multiple: this.multiple
              },
              null,
              4
            );
            console.error(message);
          }
        }
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

      Promise.all(
        fileArray.map(file => {
          return upload({
              file,
              params: this.scenario ? { scenario: this.scenario } : null
            })
            .catch(error => {
              console.error(error);
              return null;
            });
        })
      )
        .then(files => {
          const newImages = [...this.files, ...files].filter(Boolean);

          this.emitChangeEvent(newImages);
        })
        .catch(error => {
          console.error(error);

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
    clearImage(imageId) {
      const newImages = this.files.filter(image => image.id !== imageId);
      this.emitChangeEvent(newImages);
    },
    emitChangeEvent(newImages) {
      const newValue = this.multiple ? newImages : newImages[0];

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
}

.file-container {
  display: inline-block;
  position: relative;
  margin: 20px;
  text-align: center;
  /*width: 250px;*/

  .clear-button {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    background-color: #f9fafb;
    transition: transform 0.1s ease-in-out;
    border: 1px solid #ddd;

    &:hover {
      transform: translate(50%, -50%) scale(1.1);
      box-shadow: 0px 3px 2px -1px rgba(0, 0, 0, 0.2),
        0px 1px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
  }

  .file-icon {
    display: block;
    height: 200px;
    width: auto;
  }

  .file-caption {
    display: inline-block;
    max-width: 200px;
    word-break: break-all;
  }

  img {
    max-height: 250px;
    vertical-align: middle;

    /*width: 100%;*/
    /*height: 100%;*/
    /*object-fit: contain;*/
  }
}
</style>
