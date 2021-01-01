<template>
  <input ref="checkbox" type="checkbox" v-on="inputListeners" />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUpdated,
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
  setup(props, context) {
    const inputListeners = computed(() => ({
      ...context.listeners,
      change: (event: Event) => {
        const { checked } = event.target as HTMLInputElement;
        context.emit('change', checked);
      },
    }));

    function updateCheckedInDOM() {
      /** Issue: https://github.com/vuejs/vue/issues/3523 */
      if (context.refs.checkbox) {
        context.refs.checkbox.checked = Boolean(props.checked);
      }
    }

    onMounted(() => {
      updateCheckedInDOM();
    });

    onUpdated(() => {
      updateCheckedInDOM();
    });

    return {
      inputListeners,
    };
  },
});
</script>

<style scoped lang="scss">
input {
  position: absolute;
  margin-top: 0.3rem;
  -webkit-appearance: checkbox;
}
</style>
