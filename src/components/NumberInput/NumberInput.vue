<template>
  <BaseInput :value="formatNumber(value)" v-on="inputListeners" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
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
  setup(props, context) {
    function formatNumber(value: string): string {
      if (props.type === 'integer') {
        return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        // return String(Number(value).toLocaleString());
      }
      return value.replace(
        new RegExp(
          '\\B(?=(\\d{3})+' + (~value.indexOf('.') ? '\\.' : '$') + ')',
          'g'
        ),
        ' '
      );
    }

    function normalizeDots(value: string): string {
      return value.replace(DOT_REGEXP, '.');
    }

    const inputListeners = computed(() => ({
      ...context.listeners,
      input: (value: string) => {
        let normalizedValue = normalizeDots(value).replace(SPACE_REGEXP, '');

        context.emit('input', normalizedValue);
      },
      change: (value: string) => {
        const normalizedValue = normalizeDots(value).replace(SPACE_REGEXP, '');

        context.emit('change', normalizedValue);
      },
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
          if (key >= '0' && key <= '9') return true;

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
      formatNumber,
    };
  },
});
</script>

<style scoped lang="scss"></style>
