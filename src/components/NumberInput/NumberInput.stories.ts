import NumberInput from './NumberInput.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default { title: 'NumberInput' };

export const Float = () =>
  defineComponent({
    components: { NumberInput },
    setup() {
      const value = ref('123123');

      return { value };
    },
    template: '<NumberInput v-model="value" type="float" />',
  });

export const Integer = () =>
  defineComponent({
    components: { NumberInput },
    setup() {
      const value = ref('');

      return { value };
    },
    template: '<NumberInput v-model="value" type="integer" />',
  });

export const Disabled = () => ({
  components: { NumberInput },
  template: '<NumberInput disabled />',
});
