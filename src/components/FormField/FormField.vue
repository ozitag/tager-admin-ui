<template>
  <FormFieldWrapper
    :class="containerClass"
    :label="label"
    :label-for="name"
    :error="error"
  >
    <BaseTextArea
      v-if="type === 'textarea'"
      :id="name"
      :name="name"
      :value="value"
      v-bind="$attrs"
    />
    <BaseInput
      v-else
      :id="name"
      :name="name"
      :type="type"
      :value="value"
      v-bind="$attrs"
    />
  </FormFieldWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BaseInput from "../BaseInput";
import BaseTextArea from "../BaseTextArea";
import FormFieldWrapper from "../FormFieldWrapper.vue";

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  error: string;
}

export default defineComponent({
  name: "FormField",
  components: {
    BaseInput,
    BaseTextArea,
    FormFieldWrapper,
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value: string) {
        return [
          "text",
          "number",
          "email",
          "password",
          "date",
          "time",
          "textarea",
        ].includes(value);
      },
    },
    error: {
      type: String,
      default: "",
    },
    containerClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss"></style>
