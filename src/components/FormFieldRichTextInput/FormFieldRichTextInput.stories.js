import FormFieldRichTextInput from './index.vue';

export default { title: 'FormFieldRichTextInput' };

export const Default = () => ({
  name: 'FormFieldRichTextInput_Default',
  components: { FormFieldRichTextInput },
  data() {
    return {
      content: '<h1>Hello</h1>',
    };
  },
  updated() {
    console.log('Content: ', this.content);
  },
  template:
    '<form-field-rich-text-input v-model="content" name="content" label="Content" />',
});

export const WithError = () => ({
  name: 'FormFieldRichTextInput_WithError',
  components: { FormFieldRichTextInput },
  data() {
    return {
      content: '',
    };
  },
  updated() {
    console.log('Content: ', this.content);
  },
  template:
    '<form-field-rich-text-input v-model="content" name="content" label="Content"  error="Required field" />',
});

export const Disabled = () => ({
  name: 'FormFieldRichTextInput_Disabled',
  components: { FormFieldRichTextInput },
  data() {
    return {
      content: '',
    };
  },
  template:
    '<form-field-rich-text-input v-model="content" name="content" label="Content"  disabled />',
});
