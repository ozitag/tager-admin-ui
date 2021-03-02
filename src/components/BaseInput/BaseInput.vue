<template>
  <input
    :value="value"
    :type="type"
    :autocomplete="autocomplete"
    v-on="inputListeners"
  />
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api';

interface Props {
  value: string;
  type: string;
  autocomplete: string;
}

export default defineComponent<Props>({
  name: 'BaseInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
      validator(value: string) {
        return ['text', 'email', 'password', 'date', 'time'].includes(value);
      },
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
  },
  setup(props: Props, context: SetupContext) {
    const inputListeners = computed(() => ({
      ...context.listeners,
      input: (event: Event) =>
        context.emit('input', (event.target as HTMLInputElement).value),
      change: (event: Event) =>
        context.emit('change', (event.target as HTMLInputElement).value),
    }));

    return { inputListeners };
  },
});
</script>

<style scoped lang="scss">
input {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid var(--input-border-color);
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus {
    color: var(--input-color);
    background-color: #fff;
    border-color: var(--input-focus-border-color);
    outline: 0;
    box-shadow: 0 0 0 0.25rem var(--input-focus-box-shadow);
  }

  // Placeholder
  &::-moz-placeholder {
    color: var(--input-placeholder-color);
    opacity: 1;
  }

  &::placeholder {
    color: var(--input-placeholder-color);
    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.
    opacity: 1;
  }

  // Disabled and read-only inputs
  //
  // HTML5 says that controls under a fieldset > legend:first-child won't be
  // disabled if the fieldset is disabled. Due to implementation difficulty, we
  // don't honor that edge case; we style them as disabled anyway.
  &:disabled,
  &[readonly] {
    background-color: var(--input-disabled-bg);
    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
    opacity: 1;
  }
}
</style>
