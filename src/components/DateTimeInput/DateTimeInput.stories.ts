import { ref } from '@vue/composition-api';

import DateTimeInput from './DateTimeInput.vue';

export default { title: 'DateTimeInput' };

export const Default = () => ({
  name: 'DateTimeInput_Default',
  components: { DateTimeInput },
  setup() {
    const value = ref<string>('');

    return { value };
  },
  template: `
    <DateTimeInput
      v-model="value"
      label="Post date"
      name="creationDate"
    />
  `,
});
