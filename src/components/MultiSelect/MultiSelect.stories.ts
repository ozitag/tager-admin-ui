import MultiSelect from './MultiSelect.vue';
import { OptionType } from '../../../typings';
import { ref, watch } from '@vue/composition-api';

export default { title: 'MultiSelect' };

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
  name: 'DefaultMultiSelect',
  components: { MultiSelect },
  setup() {
    const selectedOptions = ref([OPTIONS[2], OPTIONS[5]]);
    const options = ref(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log('selectedOptions:', selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `<MultiSelect v-model="selectedOptions" :options="options" name="countries" :should-display-tags="true" />`,
});

export const WithSearch = () => ({
  name: 'MultiSelectWithSearch',
  components: { MultiSelect },
  setup() {
    const selectedOptions = ref([OPTIONS[3], OPTIONS[6]]);
    const options = ref(OPTIONS);

    watch(selectedOptions, (selectedOptions) => {
      console.log('selectedOptions:', selectedOptions);
    });

    return {
      selectedOptions,
      options,
    };
  },
  template: `<MultiSelect v-model="selectedOptions" :options="options" name="countries" :searchable="true" :should-display-tags="true" />`,
});
