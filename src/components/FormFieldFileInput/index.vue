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

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError/index.vue';
import InputLabel from '../InputLabel/index.vue';
import FileInput from '../FileInput/index.vue';

interface Props {
  name: string;
  label: string;
  value: [] | { [key: string]: unknown };
  error: string;
}

export default defineComponent<Props>({
  name: 'FormFieldFileInput',
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    FileInput,
  },
  inheritAttrs: false,
  model: {
    event: 'change',
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    value: [Array, Object],
    error: String,
  },
});
</script>

<style scoped lang="scss"></style>
