<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">{{ label }}</input-label>
    <file-input
      :id="name"
      :name="name"
      :value="value"
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
import FileInput from '../FileInput';
export default Vue.extend({
  name: 'FormFieldFileInput',
  components: {
    FormGroup, FormFieldError, InputLabel, FileInput
  },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    value: [Array, Object],
    error: String
  }
});
</script>

<style scoped lang="scss"></style>
