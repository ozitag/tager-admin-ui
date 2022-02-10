import { defineComponent, ref } from "vue";

import { OptionType } from "../../typings/common";

import AjaxSelect from "./AjaxSelect.vue";

export default { title: "AjaxSelect" };

export const Default = () =>
  defineComponent({
    name: "DefaultAjaxSelect",
    components: { AjaxSelect },
    setup() {
      const url = ref<string>("/admin/brands");
      const selected = ref<OptionType<number> | null>(null);

      return {
        url,
        selected,
      };
    },
    template: `<AjaxSelect v-model:value="selected" :request-url="url" value-field="id" label-field="name" />`,
  });
