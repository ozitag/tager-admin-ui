<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">
      {{ fieldLabel }}
    </input-label>
    <multi-select
      :name="name"
      :options="options"
      :selected-options="selectedOptions"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="js">
import Vue from 'vue';

import FormGroup from '../FormGroup';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import MultiSelect from '../MultiSelect';

function isValidSelectOption(option) {
  return (
    typeof option === 'object' &&
    'value' in option &&
    'label' in option
  )
}
export default Vue.extend({
  name: 'FormFieldMultiSelect',
  components: {
    FormGroup, FormFieldError, InputLabel, MultiSelect
  },
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'selectedOptions'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    error: String,
    options: {
      type: Array,
      default: () => [],
      validator(options) {
        return options.every(isValidSelectOption)
      }
    },
    selectedOptions: {
      type: Array,
      default: () => [],
      validator(options) {
        return options.every(isValidSelectOption)
      }
    },
  },
  computed: {
    fieldLabel() {
      const countLabel = this.options.length > 0
        ? `(${this.selectedOptions.length} of ${this.options.length})`
        : '';
      return [this.label, countLabel].join(' ');
    }
  }
});
</script>

<style scoped lang="scss"></style>
