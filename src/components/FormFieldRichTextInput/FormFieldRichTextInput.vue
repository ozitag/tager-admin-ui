<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">{{ label }}</InputLabel>
    <BaseRichTextInput :id="name" :name="name" :value="value" v-bind="$attrs" />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormGroup from "../FormGroup.vue";
import FormFieldError from "../FormFieldError";
import InputLabel from "../InputLabel";
import BaseRichTextInput from "../BaseRichTextInput";

interface Props {
  name: string;
  label: string;
  value: string;
  error: string;
}

export default defineComponent({
  name: "FormFieldRichTextInput",
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    BaseRichTextInput,
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
    error: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped lang="scss"></style>
