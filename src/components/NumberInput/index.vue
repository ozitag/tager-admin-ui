<template>
  <BaseInput :value="value" v-on="inputListeners" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import { Nullable, Nullish } from '@tager/admin-services';

import { DOT_REGEXP } from '../../utils/common';

import BaseInput from '../BaseInput';

type Props = {
  value: string;
  type?: Nullable<'integer' | 'float'>;
};

export default defineComponent<Props>({
  name: 'NumberInput',
  components: { BaseInput },
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      validator(value: Nullish<string>) {
        return !value || ['integer', 'float'].includes(value);
      },
    },
  },
  setup(props, context) {
    function normalizeDots(value: string): string {
      return value.replace(DOT_REGEXP, '.');
    }

    const inputListeners = computed(() => ({
      ...context.listeners,
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

    return {
      inputListeners,
    };
  },
});
</script>

<style scoped lang="scss"></style>
