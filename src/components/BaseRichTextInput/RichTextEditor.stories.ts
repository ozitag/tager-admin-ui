import BaseRichTextInput from './BaseRichTextInput.vue';
import { defineComponent } from '@vue/composition-api';

export default {
  title: 'BaseRichTextInput',
};

export const Default = () =>
  defineComponent({
    components: { BaseRichTextInput },
    setup() {
      function getUploadAdapterPluginOptions() {
        return { uploadScenario: 'custom' };
      }

      return {
        getUploadAdapterPluginOptions,
      };
    },
    template: `
      <BaseRichTextInput :get-upload-adapter-options="getUploadAdapterPluginOptions"/>`,
  });
