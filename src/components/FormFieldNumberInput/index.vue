<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">{{ label }}</input-label>
    <NumberInput
      :id="name"
      :name="name"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
    />

    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="ts">
import Vue from 'vue';
import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError/index.vue';
import InputLabel from '../InputLabel/index.vue';
import NumberInput from '../NumberInput/index.vue';

export default Vue.extend({
  name: 'FormFieldNumberInput',
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    NumberInput,
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: null,
    },
    error: {
      type: String,
      default: null,
    },
  },
});
</script>

<style scoped lang="scss"></style>
