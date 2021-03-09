import BaseCheckbox from './BaseCheckbox.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default { title: 'BaseCheckbox' };

export const Default = () =>
  defineComponent({
    components: { BaseCheckbox },
    setup() {
      const checked = ref<boolean>(false);

      return {
        checked,
      };
    },
    template: '<BaseCheckbox v-model="checked"></BaseCheckbox>',
  });

export const Disabled = () =>
  defineComponent({
    components: { BaseCheckbox },
    setup() {
      const checked = ref<boolean>(false);

      return {
        checked,
      };
    },
    template: '<BaseCheckbox v-mode="checked" disabled></BaseCheckbox>',
  });
