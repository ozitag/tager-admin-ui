<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">{{ label }}</InputLabel>
    <BaseTextArea
      v-if="type === 'textarea'"
      :id="name"
      :name="name"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <BaseInput
      v-else
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
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
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
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
    error: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss"></style>
