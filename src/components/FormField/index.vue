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

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError/index.vue';
import InputLabel from '../InputLabel/index.vue';
import BaseInput from '../BaseInput';
import BaseTextArea from '../BaseTextArea';

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  error: string;
}

export default defineComponent<Props>({
  name: 'FormField',
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    BaseInput,
    BaseTextArea,
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    value: String,
    type: {
      type: String,
      default: 'text',
      validator(value: string) {
        return [
          'text',
          'number',
          'email',
          'password',
          'date',
          'time',
          'textarea',
        ].includes(value);
      },
    },
    error: String,
  },
});
</script>

<style scoped lang="scss"></style>
