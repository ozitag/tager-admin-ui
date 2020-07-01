<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">{{ label }}</input-label>
    <base-text-area
      v-if="type === 'textarea'"
      :id="name"
      :name="name"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <base-input
      v-else
      :id="name"
      :name="name"
      :type="type"
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
import BaseInput from '@/components/BaseInput';
import BaseTextArea from '@/components/BaseTextArea';

export default Vue.extend({
  name: 'FormField',
  components: {
    FormGroup, FormFieldError, InputLabel, BaseInput, BaseTextArea
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    value: String,
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return [
          'text',
          'number',
          'email',
          'password',
          'date',
          'textarea'
        ].includes(value);
      }
    },
    error: String
  },
});
</script>

<style scoped lang="scss"></style>
