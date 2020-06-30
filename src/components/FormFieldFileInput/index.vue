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
import FormGroup from '@/components/FormGroup';
import FormFieldError from '@/components/FormFieldError';
import InputLabel from '@/components/InputLabel';
import FileInput from '@/components/FileInput';

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
