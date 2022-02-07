<template>
  <input
    ref="checkboxRef"
    type="checkbox"
    value="value"
    @change="handleChange"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";

interface Props {
  checked: boolean;
}

export default defineComponent({
  name: "BaseCheckbox",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["change"],
  setup(props: Props, context) {
    const checkboxRef = ref<HTMLInputElement | null>(null);

    function updateCheckedInDOM() {
      /** Issue: https://github.com/vuejs/vue/issues/3523 */
      if (checkboxRef.value) {
        checkboxRef.value.checked = props.checked;
      }
    }

    function handleChange(event: Event) {
      const checked = (event.target as HTMLInputElement).checked;
      updateCheckedInDOM();
      context.emit("change", checked, event);
    }

    watchEffect(updateCheckedInDOM);

    return {
      checkboxRef,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
input {
  position: absolute;
  margin-top: 0.25rem;
  -webkit-appearance: checkbox;
}
</style>
