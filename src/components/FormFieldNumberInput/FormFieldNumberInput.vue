<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">{{ label }}</InputLabel>
    <NumberInput
      :id="name"
      :name="name"
      :value="value"
      :thousands-separator="thousandsSeparator"
      v-bind="$attrs"
    />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormGroup from "../FormGroup.vue";
import FormFieldError from "../FormFieldError";
import InputLabel from "../InputLabel";
import NumberInput from "../NumberInput";

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  error: string;
  thousandsSeparator?: string;
}

export default defineComponent({
  name: "FormFieldNumberInput",
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
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: null,
    },
  },
});
</script>

<style scoped lang="scss"></style>
