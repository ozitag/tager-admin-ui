<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">{{ label }}</input-label>
    <NumberInput
      :id="name"
      :name="name"
      :value="value"
      :thousands-separator="thousandsSeparator"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import NumberInput from '../NumberInput';

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  error: string;
  thousandsSeparator?: string;
}

export default defineComponent<Props>({
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
    thousandsSeparator: {
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
