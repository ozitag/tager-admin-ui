import { defineComponent, ref } from '@vue/composition-api';
import BaseInput from './BaseInput.vue';

export default { title: 'BaseInput' };

export const Default = () =>
  defineComponent({
    components: { BaseInput },
    setup() {
      const value = ref('default');

      return {
        value,
      };
    },
    template: '<BaseInput v-model="value" />',
  });

export const Readonly = () => ({
  components: { BaseInput },
  setup() {
    const value = ref('readonly');

    return {
      value,
    };
  },
  template: '<BaseInput v-model="value" :readonly="true" />',
});

export const Disabled = () => ({
  components: { BaseInput },
  setup() {
    const value = ref('disabled');

    return {
      value,
    };
  },
  template: '<BaseInput v-model="value" :disabled="true" />',
});
