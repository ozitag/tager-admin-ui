<template>
  <textarea :value="value" v-on="inputListeners" />
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseTextArea',
  props: {
    value: String,
  },
  computed: {
    inputListeners() {
      const vm = this;

      return {
        ...vm.$listeners,
        input: (event) => vm.$emit('input', event.target.value),
        change: (event) => vm.$emit('change', event.target.value),
      };
    },
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
