import FormFieldMultiSelect from './FormFieldMultiSelect.vue';
import { OptionType } from '../../../typings';
import { ref, watch } from '@vue/composition-api';

export default { title: 'FormFieldMultiSelect' };

const OPTIONS: Array<OptionType> = [
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
  name: 'DefaultFormFieldMultiSelect',
  components: { FormFieldMultiSelect },
  setup() {
    const selectedOptions = ref<Array<OptionType>>([]);
    const options = ref<Array<OptionType>>(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log('selectedOptions:', selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `
    <FormFieldMultiSelect
      v-model="selectedOptions"
      :options="options"
      name="countries"
      label="Countries"
      error="Please, select at least 4 countries"
    />
  `,
});
