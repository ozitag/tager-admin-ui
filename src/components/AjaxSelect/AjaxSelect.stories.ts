import AjaxSelect from './AjaxSelect.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { OptionType } from '../../typings/common';

export default { title: 'AjaxSelect' };

export const Default = () =>
  defineComponent({
    name: 'DefaultAjaxSelect',
    components: { AjaxSelect },
    setup() {
      const url = ref<string>('/admin/brands');
      const selected = ref<OptionType<number> | null>(null);

      return {
        url,
        selected,
      };
    },
    template: `<AjaxSelect v-model="selected" :request-url="url" value-field="id" label-field="name" />`,
  });
