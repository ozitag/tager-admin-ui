<template>
  <textarea
    ref="textareaRef"
    :autocomplete="autocomplete"
    :rows="rows"
    :value="value"
    v-on="inputListeners"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from '@vue/composition-api';
import autosize from 'autosize';

interface Props {
  value: string;
  autosize: boolean;
  rows: number;
  autocomplete: string;
}

export default defineComponent<Props>({
  name: 'BaseTextArea',
  props: {
    value: {
      type: String,
      default: '',
    },
    autosize: {
      type: Boolean,
      default: true,
    },
    rows: {
      type: Number,
      default: 3,
    },
    autocomplete: {
      type: String,
      default: 'off',
      validator(value: string) {
        return ['on', 'off'].includes(value);
      },
    },
  },
  setup(props, context) {
    const textareaRef = ref<HTMLTextAreaElement | null>(null);

    const inputListeners = computed(() => ({
      ...context.listeners,
      input: (event: Event) => {
        const { value } = event.target as HTMLInputElement;
        context.emit('input', value);
      },
      change: (event: Event) => {
        const { value } = event.target as HTMLInputElement;
        context.emit('change', value);
      },
    }));

    onMounted(() => {
      if (props.autosize && textareaRef.value) {
        autosize(textareaRef.value);
      }
    });

    onUpdated(() => {
      /**
       * We should update autosize in case when textarea becomes visible
       * When textarea is hidden, element's `scrollHeight` equals to 0 and `resize` doesn't work.
       * We can't watch some prop, because nothing changes except style `display: none -> block`
       */
      if (props.autosize && textareaRef.value) {
        autosize.update(textareaRef.value);
      }
    });

    onUnmounted(() => {
      if (props.autosize && textareaRef.value) {
        autosize.destroy(textareaRef.value);
      }
    });

    return { textareaRef, inputListeners };
  },
});
</script>

<style scoped lang="scss">
textarea {
  display: block;
  width: 100%;
  height: auto;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid var(--input-border-color);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: auto;
  resize: vertical;

  // Placeholder
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

  &:focus {
    color: var(--input-color);
    background-color: #fff;
    border-color: var(--input-focus-border-color);
    outline: 0;
    box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);
  }
}
</style>
