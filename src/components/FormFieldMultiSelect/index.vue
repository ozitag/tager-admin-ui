<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name"
      >{{ label }} ({{ selectedOptions.length }} of
      {{ options.length }})</input-label
    >
    <multi-select
      :name="name"
      :options="options"
      :selected-options="selectedOptions"
      v-on="$listeners"
      v-bind="$attrs"
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

function isValidOption(option) {
  return (
          typeof option === 'object' &&
          'value' in option &&
          'label' in option
  )
}

export default Vue.extend({
  name: 'FormFieldMultiSelect',
  inheritAttrs: false,
  components: {
    FormGroup, FormFieldError, InputLabel, MultiSelect
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
      default: [],
      validator(options) {
        return options.every(isValidOption)
      }
    },
    selectedOptions: {
      type: Array,
      default: [],
      validator(options) {
        return options.every(isValidOption)
      }
    },

  },
  model: {
    event: 'change',
    prop: 'selectedOptions'
  },
});
</script>

<style scoped lang="scss"></style>
