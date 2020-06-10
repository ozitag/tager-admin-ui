import FormFieldCheckbox from './index.vue';

export default { title: 'FormFieldCheckbox' };

export const Default = () => ({
  components: { FormFieldCheckbox },
  data() {
    return {
      isValid: false,
    };
  },
  template:
    '<form-field-checkbox v-model="isValid" name="isValid" label="Is valid?" />',
});

export const WithError = () => ({
  components: { FormFieldCheckbox },
  data() {
    return {
      isValid: false,
    };
  },
  template:
    '<form-field-checkbox v-model="isValid" name="isValid" label="Is valid?" error="Required field" />',
});

export const Disabled = () => ({
  components: { FormFieldCheckbox },
  data() {
    return {
      isValid: false,
    };
  },
  template:
    '<form-field-checkbox v-model="isValid" name="isValid" label="Is valid?" disabled />',
});
