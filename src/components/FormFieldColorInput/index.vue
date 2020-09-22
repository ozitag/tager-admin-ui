<template>
  <FormFieldWrapper :name="name" :label="label" :error="error">
    <ColorInput :value="value" v-bind="$attrs" v-on="$listeners" />
  </FormFieldWrapper>
</template>

<script lang="js">
import Vue from 'vue';
import FormFieldWrapper from "../FormFieldWrapper.vue";
import ColorInput from "../ColorInput";

export default Vue.extend({
  name: 'FormFieldColorInput',
  components: {
    FormFieldWrapper, ColorInput
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
