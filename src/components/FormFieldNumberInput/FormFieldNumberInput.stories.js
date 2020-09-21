import FormFieldNumberInput from './index.vue';

export default { title: 'FormFieldNumberInput' };

export const Default = () => ({
  components: { FormFieldNumberInput },
  data() {
    return {
      age: '',
    };
  },
  template:
    '<FormFieldNumberInput v-model="age" name="age" label="Age" type="age" />',
});

export const WithError = () => ({
  components: { FormFieldNumberInput },
  data() {
    return {
      age: '',
    };
  },
  template:
    '<FormFieldNumberInput v-model="age" name="age" label="Age" type="age" error="Required field" />',
});

export const Disabled = () => ({
  components: { FormFieldNumberInput },
  data() {
    return {
      age: '',
    };
  },
  template:
    '<FormFieldNumberInput v-model="age" name="age" label="Age" type="age" disabled />',
});
