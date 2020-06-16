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
import FormGroup from '@/components/FormGroup';
import FormFieldError from '@/components/FormFieldError';
import InputLabel from '@/components/InputLabel';
import BaseRichTextInput from '@/components/BaseRichTextInput';

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
