<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">
      {{ label }}
    </input-label>
    <multi-select
      :name="name"
      :options="options"
      :selected-options="computedSelectedOptions"
      v-bind="$attrs"
      @change="handleChange"
    />
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="js">
import Vue from 'vue';
import { notEmpty } from "@tager/admin-services";

import FormGroup from '../FormGroup';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import MultiSelect from '../MultiSelect';
import { isValidSelectOption } from "../../utils/common";

export default Vue.extend({
  name: 'FormFieldSingleSelect',
  components: {
    FormGroup, FormFieldError, InputLabel, MultiSelect
  },
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'value'
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
    value: {
      type: Object,
      default: null,
      validator(value) {
        return !value || isValidSelectOption(value)
      }
    },
  },
  computed: {
    computedSelectedOptions() {
      return [this.value].filter(notEmpty)
    }
  },
  methods: {
    handleChange(selectedOptions) {
      console.log('selectedOptions: ', selectedOptions);
      const newValue = selectedOptions.length > 1
        ? selectedOptions[1]
        : selectedOptions.length === 1
          ? selectedOptions[0] : null;

      this.$emit('change', newValue);
    }
  }
});
</script>

<style scoped lang="scss"></style>
