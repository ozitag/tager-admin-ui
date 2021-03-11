import { defineComponent, ref } from '@vue/composition-api';

import FormFieldColorInput from './FormFieldColorInput.vue';

export default { title: 'FormFieldColorInput' };

export const Default = () =>
  defineComponent({
    components: { FormFieldColorInput },
    setup() {
      const color = ref('');
      return { color };
    },
    template:
      '<FormFieldColorInput v-model="color" name="color" label="Color" type="color" />',
  });

export const WithError = () =>
  defineComponent({
    components: { FormFieldColorInput },
    setup() {
      const color = ref('');
      return { color };
    },
    template:
      '<FormFieldColorInput v-model="color" name="color" label="Color" type="color" error="Required field" />',
  });
