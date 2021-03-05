<template>
  <div class="upload">
    <div class="files">
      <div class="file">1</div>
    </div>

    <div class="dropzone">
      <label class="file-input-label">
        <input
          ref="fileInputRef"
          type="file"
          :accept="accept"
          :multiple="multiple"
          @change="handleDropzoneChange"
        />
      </label>

      <div class="display">
        <SvgIcon name="upload" class="icon-upload" />
        <div class="message">Upload</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';
import SvgIcon from '../SvgIcon';
import { SingleFileInputValueType } from '../../typings/common';

interface Props {
  value: SingleFileInputValueType | Array<SingleFileInputValueType> | null;
  multiple: boolean;
  accept: string;
}

export default defineComponent<Props>({
  name: 'MiniFileInput',
  components: { SvgIcon },
  props: {
    value: {
      type: [Object, Array],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: null,
    },
  },
  setup(props: Props, context: SetupContext) {
    function handleDropzoneChange() {
      // code...
    }

    return {
      handleDropzoneChange,
    };
  },
});
</script>

<style scoped lang="scss">
.upload {
  display: flex;
  flex-wrap: wrap;
}

.files {
  margin-right: 8px;

  .file {
    width: 104px;
    height: 104px;
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;

    .file-inner {
    }

    .file-thumbnail {
    }

    .file-title {
    }
  }
}

.dropzone {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 104px;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  transition: border-color 0.3s;

  .file-input-label {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;

    input {
      display: none;
    }
  }

  .display {
    display: flex;
    flex-direction: column;
    align-items: center;

    .message {
      margin-top: 8px;
    }
  }

  &:hover {
    border-color: var(--primary);
  }
}
</style>
