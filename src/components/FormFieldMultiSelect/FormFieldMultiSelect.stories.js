import FormFieldMultiSelect from './index.vue';

export default { title: 'FormFieldMultiSelect' };

const OPTIONS = [
  { value: 'by', label: 'Belarus' },
  { value: 'ru', label: 'Russia' },
  { value: 'fr', label: 'France' },
  { value: 'us', label: 'United States of America' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'es', label: 'Spain' },
  { value: 'au', label: 'Austria' },
  { value: 'pl', label: 'Poland' },
  { value: 'ge', label: 'Germany' },
];

export const Default = () => ({
  name: 'FormFieldMultiSelect_Default',
  components: { FormFieldMultiSelect },
  data() {
    return {
      selectedOptions: [],
      options: OPTIONS,
    };
  },
  updated() {
    console.log('selectedOptions: ', this.selectedOptions);
  },
  template:
    '<form-field-multi-select v-model="selectedOptions" :options="options" name="countries" label="Countries" error="Please, select at least 4 countries" />',
});
