import Code from './Code.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default { title: 'Code' };

export const Default = () =>
  defineComponent({
    components: { Code },
    setup() {
      const value = ref<string>('');

      return {
        value,
      };
    },
    template: '<Code v-model="value" />',
  });
