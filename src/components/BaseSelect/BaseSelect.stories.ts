import BaseSelect from './BaseSelect.vue';
import { OptionType } from '../../../typings';
import { defineComponent, ref, watch } from '@vue/composition-api';

export default { title: 'BaseSelect' };

const OPTIONS: Array<OptionType> = [
  { value: '1', label: 'Belarus' },
  { value: '2', label: 'Russia' },
  { value: '3', label: 'France' },
  { value: '4', label: 'United States of America' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'es', label: 'Spain' },
  { value: 'au', label: 'Austria' },
  { value: 'pl', label: 'Poland' },
  { value: 'ge', label: 'Germany' },
];

export const Default = () =>
  defineComponent({
    name: 'DefaultBaseSelect',
    components: { BaseSelect },
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
      <BaseSelect
        v-model="selected"
        :options="options"
      />
    `,
  });
