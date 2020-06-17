import MultiSelect from './index.vue';

export default { title: 'MultiSelect' };

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
  name: 'MultiSelect_Default',
  components: { MultiSelect },
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
    '<multi-select v-model="selectedOptions" :options="options" name="countries" />',
});
