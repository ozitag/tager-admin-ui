<template>
  <input :value="value" :type="type" v-on="inputListeners" />
</template>

<script lang="js">
import Vue from "vue";

export default Vue.extend({
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        return ["text", "email", "password", "date", 'time'].includes(value);
      }
    }
  },
  data() {
    const initialValue = this.value;
    return {
      inputValue: initialValue
    };
  },
  computed: {
    inputListeners() {
      const vm = this;

      return {
        ...vm.$listeners,
        input: event => vm.$emit("input", event.target.value),
        change: event => vm.$emit("change", event.target.value),
      };
    }
  },
  updated() {
    this.inputValue = this.value;
  },
});
</script>

<style scoped lang="scss">
input {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
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
