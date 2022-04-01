<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">
      {{ label }}
    </InputLabel>
    <ComboBox :id="name" :name="name" v-bind="$attrs" />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import FormGroup from "../FormGroup.vue";
import InputLabel from "../InputLabel";
import FormFieldError from "../FormFieldError";
import ComboBox from "../ComboBox";

interface Props {
  name: string;
  label: string;
  error: string;
}

export default defineComponent({
  name: "FormFieldComboBox",
  components: {
    FormGroup,
    InputLabel,
    FormFieldError,
    ComboBox,
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
    error: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped></style>
