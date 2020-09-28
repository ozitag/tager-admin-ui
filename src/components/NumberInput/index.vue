<template>
  <BaseInput :value="value" v-bind="inputAttrs" />
</template>

<script lang="ts">
import { computed, defineComponent, h } from 'vue';

import { Nullable } from '@tager/admin-services';

import { DOT_REGEXP } from '../../utils/common';

import BaseInput from '../BaseInput/index.vue';

type Props = {
  value: string;
  type: Nullable<'integer' | 'float'>;
};

export default defineComponent<Props>(function NumberInput(props, context) {
  function normalizeDots(value: string): string {
    return value.replace(DOT_REGEXP, '.');
  }

  const inputAttrs = computed(() => ({
    ...context.attrs,
    input: (value: string) => {
      const normalizedValue = normalizeDots(value);
      context.emit('input', normalizedValue);
    },
    change: (value: string) => {
      const normalizedValue = normalizeDots(value);
      context.emit('change', normalizedValue);
    },
    keydown: (event: KeyboardEvent) => {
      const ALLOWED_KEYS = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'];
      const DOTS = [',', '.'];

      const isValueContainsDot = DOTS.some((dotChar) =>
        props.value.includes(dotChar)
      );

      if (props.type !== 'integer' && !isValueContainsDot) {
        ALLOWED_KEYS.push('.', ',');
      }

      function isKeyAllowed(key: string) {
        if (key >= '0' && key <= '9') return true;

        return ALLOWED_KEYS.includes(key);
      }

      if (!isKeyAllowed(event.key)) {
        event.preventDefault();
      }
    },
  }));

  return h(BaseInput, {}, 4);
});
</script>

<style scoped lang="scss"></style>
