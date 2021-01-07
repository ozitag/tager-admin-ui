<template>
  <FormFieldWrapper :name="name" :label="label" :error="error">
    <ColorInput :value="value" v-bind="$attrs" v-on="$listeners" />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import FormFieldWrapper from '../FormFieldWrapper.vue';
import ColorInput from '../ColorInput';

interface Props {
  value: string;
  name: { [key: string]: string };
  label: { [key: string]: string };
  error: { [key: string]: unknown };
}

export default defineComponent<Props>({
  name: 'FormFieldColorInput',
  components: {
    FormFieldWrapper,
    ColorInput,
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: '',
    },
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    error: { type: String, default: null },
  },
});
</script>

<style scoped lang="scss"></style>
