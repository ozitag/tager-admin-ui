<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">{{ label }}</input-label>
    <base-rich-text-input
      :id="name"
      :name="name"
      :value="value"
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
import BaseRichTextInput from '../BaseRichTextInput';

export default Vue.extend({
  name: 'FormFieldRichTextInput',
  inheritAttrs: false,
  components: {
    FormGroup, FormFieldError, InputLabel, BaseRichTextInput
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    value: String,
    error: String
  },
});
</script>

<style scoped lang="scss"></style>
