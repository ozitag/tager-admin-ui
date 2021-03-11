import FormFieldSingleSelect from './FormFieldSingleSelect.vue';
import { defineComponent, ref, watch } from '@vue/composition-api';
import { OptionType } from '../../typings/common';

export default { title: 'FormFieldSingleSelect' };

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

export const Default = () =>
  defineComponent({
    name: 'FormFieldSingleSelect_Default',
    components: { FormFieldSingleSelect },
    setup() {
      const value = ref<OptionType | null>();

      watch(value, (newValue) => {
        console.log('value:', newValue);
      });

      return {
        value,
        options: OPTIONS,
      };
    },
    template: `
      <FormFieldSingleSelect
        v-model="value"
        :options="options"
        name="countries"
        label="Countries"
        error="Please, select at least 4 countries"
      />
    `,
  });
