<template>
  <BaseInput :value="formattedNumber" v-on="inputListeners" />
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api';
import { Nullable, Nullish } from '@tager/admin-services';
import { DOT_REGEXP, SPACE_REGEXP } from '../../utils/common';
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
  setup(props: Props, context: SetupContext) {
    const formattedNumber = computed<string>(() => {
      const containsDot = props.value.includes('.');
      const [integer, fraction] = props.value.split('.');

      /** Reference: https://stackoverflow.com/a/16637170 */
      const regexp = /\B(?=(\d{3})+(?!\d))/g;

      /** e.g. "12345678" => "12 345 678" */
      const formattedInteger = integer ? integer.replace(regexp, ' ') : '';

      return [formattedInteger, containsDot ? '.' : '', fraction]
        .filter(Boolean)
        .join('');
    });

    function normalizeDots(value: string): string {
      return value.replace(DOT_REGEXP, '.');
    }

    function normalizeNumber(formattedNumber: string): string {
      return normalizeDots(formattedNumber).replace(SPACE_REGEXP, '');
    }

    const inputListeners = computed(() => ({
      ...context.listeners,
      input: (value: string) => context.emit('input', normalizeNumber(value)),
      change: (value: string) => context.emit('change', normalizeNumber(value)),
      keydown: (event: KeyboardEvent) => {
        const ALLOWED_KEYS = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'];
        const DOTS = [',', '.'];

        const isValueContainsDot = DOTS.some((dotChar) =>
          props.value.includes(dotChar)
        );

        if (props.type !== 'integer' && !isValueContainsDot) {
          ALLOWED_KEYS.push(...DOTS);
        }

        function isKeyAllowed(key: string) {
          if (
            (key >= '0' && key <= '9') ||
            (props.value.length === 0 && key === '-')
          )
            return true;

          return ALLOWED_KEYS.includes(key);
        }

        if (event.ctrlKey || event.metaKey) {
          return true;
        }

        if (!isKeyAllowed(event.key)) {
          event.preventDefault();
        }
      },
    }));

    return {
      inputListeners,
      formattedNumber,
    };
  },
});
</script>

<style scoped lang="scss"></style>
