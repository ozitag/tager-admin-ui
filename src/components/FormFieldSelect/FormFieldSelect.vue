<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">
      {{ label }}
    </InputLabel>
    <ComboBox
      :id="name"
      :searchable="searchable"
      :name="name"
      v-bind="$attrs"
    />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ComboBox from "../ComboBox";
import FormGroup from "../FormGroup.vue";
import FormFieldError from "../FormFieldError";
import InputLabel from "../InputLabel";

interface Props {
  searchable: boolean;
  name: string;
  label: string;
  error: string;
}

export default defineComponent({
  name: "FormFieldSelect",
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    ComboBox,
  },
  inheritAttrs: false,
  props: {
    searchable: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    label: String,
    error: String,
  },
});
</script>

<style scoped lang="scss"></style>
