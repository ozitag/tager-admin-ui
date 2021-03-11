<template>
  <input ref="checkboxRef" type="checkbox" v-on="inputListeners" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
  ref,
  SetupContext,
} from '@vue/composition-api';

interface Props {
  checked: boolean;
}

export default defineComponent<Props>({
  name: 'BaseCheckbox',
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
  setup(props: Props, context: SetupContext) {
    const checkboxRef = ref<HTMLInputElement | null>(null);

    const inputListeners = computed(() => ({
      ...context.listeners,
      change: (event: Event) =>
        context.emit('change', (event.target as HTMLInputElement).checked),
    }));

    function updateCheckedInDOM() {
      /** Issue: https://github.com/vuejs/vue/issues/3523 */
      if (checkboxRef.value) {
        checkboxRef.value.checked = props.checked;
      }
    }

    onMounted(() => {
      updateCheckedInDOM();
    });

    onUpdated(() => {
      updateCheckedInDOM();
    });

    return {
      checkboxRef,
      inputListeners,
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
