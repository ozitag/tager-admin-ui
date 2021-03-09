<template>
  <div class="upload-from-url">
    <FormGroup>
      <BaseInput
        v-model="url"
        class="form-control"
        name="url"
        type="text"
        :placeholder="
          t('ui:uploadFileFromUrlForm.placeholder', {
            url: 'https://site.com/image.jpg',
          })
        "
        :disabled="isLoading"
      />
      <FormFieldError v-if="Boolean(error)">
        {{ error }}
      </FormFieldError>
    </FormGroup>

    <BaseButton
      class="form-button"
      variant="primary"
      :loading="isLoading"
      :disabled="disabled"
      @click="onSubmit"
    >
      {{ t('ui:uploadFileFromUrlForm.upload') }}
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from '@vue/composition-api';
import {
  FileType,
  getMessageFromError,
  isAbsoluteUrl,
  request,
  RequestError,
} from '@tager/admin-services';

import FormGroup from '../FormGroup.vue';
import BaseInput from '../BaseInput';
import FormFieldError from '../FormFieldError';
import BaseButton from '../BaseButton';
import useTranslation from '../../hooks/useTranslation';

export default defineComponent({
  name: 'UploadFileFromUrlForm',
  components: {
    FormGroup,
    BaseInput,
    FormFieldError,
    BaseButton,
  },
  setup(props, context) {
    const { t } = useTranslation(context);
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
            return t('ui:uploadFileFromUrlForm.fileTooLarge');
          case 404:
            return t('ui:uploadFileFromUrlForm.uploadEndpointIsNotFound');
        }
      }

      return getMessageFromError(error) || 'Error';
    }

    function onSubmit() {
      error.value = '';

      if (!isAbsoluteUrl(url.value)) {
        error.value = t('ui:uploadFileFromUrlForm.invalidUrl');
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

    return {
      t,
      url,
      isLoading,
      error,
      disabled,
      onSubmit,
    };
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
