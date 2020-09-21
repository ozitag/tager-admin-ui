import NumberInput from './index.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default { title: 'NumberInput' };

export const Default = () =>
  defineComponent({
    components: { NumberInput },
    setup() {
      const value = ref('0');
      return { value };
    },
    template: '<NumberInput v-model="value" type="float"></NumberInput>',
  });

export const Disabled = () => ({
  components: { NumberInput },
  template: '<NumberInput disabled></NumberInput>',
});
