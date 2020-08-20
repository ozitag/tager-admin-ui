import BaseRichTextInput from './index';

export default {
  title: 'BaseRichTextInput',
};

export const Default = () => ({
  components: { BaseRichTextInput },
  methods: {
    getUploadAdapterPluginOptions() {
      return { uploadScenario: 'custom' };
    },
  },
  template: `
      <base-rich-text-input :get-upload-adapter-options="getUploadAdapterPluginOptions"/>`,
});
