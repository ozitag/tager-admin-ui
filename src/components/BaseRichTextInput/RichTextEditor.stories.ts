import BaseRichTextInput from './BaseRichTextInput.vue';
import { defineComponent, ref } from '@vue/composition-api';

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

      const value = ref('');

      return {
        getUploadAdapterPluginOptions,
        value,
      };
    },
    template: `
      <BaseRichTextInput :get-upload-adapter-options="getUploadAdapterPluginOptions" v-model="value"/>`,
  });
