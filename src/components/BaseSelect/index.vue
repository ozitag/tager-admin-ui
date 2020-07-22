<template>
  <select class="form-select" :multiple="multiple" v-on="selectListeners">
    <option value="" :selected="selectedOptions.length === 0" data-placeholder>
      {{ placeholderOptionLabel }}
    </option>

    <option
      v-for="option of options"
      :key="option.value"
      :value="option.value"
      :selected="isOptionSelected(option)"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="js">
import Vue from 'vue';
import { notEmpty } from "@tager/admin-services";

import { isValidSelectOption } from "../../utils/common";

export default Vue.extend({
  name: 'BaseSelect',
  props: {
    value: {
      type: [Object, Array],
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => [],
      validator(options) {
        return (
          Array.isArray(options) &&
          options.every(isValidSelectOption)
        );
      },
    },
  },
  computed: {
    selectedOptions() {
      return Array.isArray(this.value) ? this.value : [this.value].filter(notEmpty);
    },
    selectListeners() {
      const vm = this;

      function handleChange(eventName) {
        return event => {
          const element = event.target;
          const selectedOptions = [...element.selectedOptions]
            .filter(optionElement => !Object.keys(optionElement.dataset).includes('placeholder'))
            .map(
              (optionElement) => ({
                value: optionElement.value,
                label: optionElement.text,
              })
            );
          const value = element.multiple ? selectedOptions : selectedOptions[0];
          vm.$emit(eventName, value);
        }
      }

      return {
        ...vm.$listeners,
        input: handleChange('input'),
        change: handleChange('change'),
      };
    },
    placeholderOptionLabel() {
      return this.placeholder ||
              (this.multiple ? 'Please select multiple' : 'Please select one');
    }
  },
  methods: {
    isOptionSelected(option) {
        return this.selectedOptions.some(
          (selectedOption) => String(selectedOption.value) === String(option.value)
        );
    },
  },
});
</script>
<style scoped lang="scss">
/** Reference: https://github.com/twbs/bootstrap/blob/v5.0.0-alpha1/scss/forms/_form-select.scss */
.form-select {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  vertical-align: middle;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid var(--input-border-color);
  border-radius: 0.25rem;
  appearance: none;

  &:focus {
    border-color: var(--input-focus-border-color);
    outline: 0;
    box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);

    &::-ms-value {
      // For visual consistency with other platforms/browsers,
      // suppress the default white text on blue background highlight given to
      // the selected option text when the (still closed) <select> receives focus
      // in Edge.
      // See https://github.com/twbs/bootstrap/issues/19398.
      color: var(--input-color);
      background-color: white;
    }
  }

  &[multiple],
  &[size]:not([size='1']) {
    height: auto;
    padding-right: 0.75rem;
    background-image: none;
  }

  &:disabled {
    color: var(--input-disabled-color);
    background-color: var(--input-disabled-bg);
  }

  // Remove outline from select box in FF
  &:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 var(--input-color);
  }

  option[data-placeholder] {
    color: var(--input-disabled-color);
    font-weight: bold;
  }
}
</style>
