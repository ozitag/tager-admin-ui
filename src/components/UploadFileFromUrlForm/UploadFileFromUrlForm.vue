<template>
  <div class="upload-from-url">
    <form-group>
      <base-input
        v-model="url"
        class="form-control"
        name="url"
        type="text"
        placeholder="Type the file URL, example https://site.com/image.jpg"
        :disabled="isLoading"
      />
      <form-field-error v-if="Boolean(error)">
        {{ error }}
      </form-field-error>
    </form-group>

    <base-button
      class="form-button"
      variant="primary"
      :loading="isLoading"
      :disabled="disabled"
      @click="onSubmit"
    >
      Upload
    </base-button>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from '@vue/composition-api';
import {
  FileType,
  getMessageFromError,
  request,
  RequestError,
} from '@tager/admin-services';

import FormGroup from '../FormGroup.vue';
import BaseInput from '../BaseInput/index.vue';
import FormFieldError from '../FormFieldError/index.vue';
import BaseButton from '../BaseButton/index.vue';

function isUrlValid(url: string) {
  try {
    const validUrl = new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export default defineComponent({
  name: 'UploadFileFromUrlForm',
  components: {
    FormGroup,
    BaseInput,
    FormFieldError,
    BaseButton,
  },
  setup(props, context) {
    const url = ref('');
    const isLoading = ref(false);
    const error = ref('');
    const disabled = computed(() => !url.value || isLoading.value);

    function uploadFileUrl(url: string): Promise<FileType> {
      const formData = new FormData();
      formData.append('url', url);

      return request.post({
        path: '/admin/upload',
        body: formData,
      });
    }

    function getUploadErrorMessage(error: Error) {
      if (error instanceof RequestError) {
        switch (error.status) {
          case 413:
            return 'File too large';
          case 404:
            return 'Upload endpoint is not found';
        }
      }

      return getMessageFromError(error) || 'Error';
    }

    function onSubmit() {
      error.value = '';

      if (!isUrlValid(url.value)) {
        error.value = 'Invalid URL';
        return;
      }

      isLoading.value = true;

      uploadFileUrl(url.value)
        .then((savedFile) => {
          url.value = '';
          isLoading.value = false;
          context.emit('change', savedFile);
        })
        .catch((e) => {
          isLoading.value = false;
          error.value = getUploadErrorMessage(e);
        });
    }

    return { url, isLoading, error, disabled, onSubmit };
  },
});
</script>

<style scoped lang="scss">
.upload-from-url {
  display: flex;
  flex-direction: column;
  align-items: center;

  .form-control {
    width: 600px;
    padding-top: 10px;
    padding-bottom: 10px;
    height: auto;
  }

  .form-button {
    padding: 10px 30px;
  }
}
</style>
