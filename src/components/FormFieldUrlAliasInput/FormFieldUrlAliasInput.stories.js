import FormFieldUrlAliasInput from './index.vue';

export default { title: 'FormFieldUrlAliasInput' };

export const Default = () => ({
  components: { FormFieldUrlAliasInput },
  data() {
    return {
      alias: '',
    };
  },
  template:
    '<form-field-url-alias-input v-model="alias" label="URL alias" url-prefix="http://ozitag.com/posts" />',
});

export const WithError = () => ({
  components: { FormFieldUrlAliasInput },
  data() {
    return {
      alias: '',
    };
  },
  template:
    '<form-field-url-alias-input v-model="alias" label="URL alias" error="Required field" />',
});

export const Disabled = () => ({
  components: { FormFieldUrlAliasInput },
  data() {
    return {
      alias: '',
    };
  },
  template:
    '<form-field-url-alias-input v-model="alias" label="URL alias" disabled />',
});
