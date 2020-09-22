import ColorInput from './ColorInput.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default { title: 'ColorInput' };

export const Default = () =>
  defineComponent({
    components: { ColorInput },
    setup() {
      const value = ref('');
      return { value };
    },
    template: '<ColorInput v-model="value"></ColorInput>',
  });

export const Disabled = () => ({
  components: { ColorInput },
  template: '<ColorInput disabled></ColorInput>',
});
