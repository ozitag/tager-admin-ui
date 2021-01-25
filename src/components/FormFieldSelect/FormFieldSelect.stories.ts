import FormFieldSelect from './FormFieldSelect.vue';
import { ref, watch } from '@vue/composition-api';
import { OptionType } from '../../../typings';

export default { title: 'FormFieldSelect' };

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
  name: 'DefaultFormFieldSelect',
  components: { FormFieldSelect },
  setup() {
    const selected = ref<OptionType | null>(null);
    const options = ref<Array<OptionType>>(OPTIONS);

    watch(selected, (selected) => {
      console.log('selected:', selected);
    });

    return {
      selected,
      options,
    };
  },
  template: `
    <FormFieldSelect
      v-model="selected"
      :options="options"
      name="countries"
      label="Countries"
      error="Please, select at least 4 countries"
      no-options-message="No options"
    />
  `,
});
