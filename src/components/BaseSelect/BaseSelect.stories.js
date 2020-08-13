import BaseSelect from './index.vue';

export default { title: 'BaseSelect' };

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
  name: 'BaseSelect_Default',
  components: { BaseSelect },
  data() {
    return {
      value: null,
      options: OPTIONS,
    };
  },
  updated() {
    console.log('value: ', this.value);
  },
  template: `
    <base-select
      v-model="value"
      :options="options"
      name="countries"
      label="Countries"
      error="Please, select at least 4 countries"
      no-options-message="No options"
    />
  `,
});
