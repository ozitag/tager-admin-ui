<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">
      {{ label }}
    </InputLabel>
    <ComboBox :id="name" :name="name" v-bind="$attrs" v-on="$listeners" />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import FormGroup from '../FormGroup.vue';
import InputLabel from '../InputLabel';
import FormFieldError from '../FormFieldError';
import ComboBox from '../ComboBox';

interface Props {
  name: string;
  label: string;
  error: string;
}

export default defineComponent<Props>({
  name: 'FormFieldComboBox',
  inheritAttrs: false,
  components: {
    FormGroup,
    InputLabel,
    FormFieldError,
    ComboBox,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped></style>
