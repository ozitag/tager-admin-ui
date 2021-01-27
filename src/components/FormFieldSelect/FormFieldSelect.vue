<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">
      {{ label }}
    </input-label>
    <ComboBox
      :id="name"
      :searchable="searchable"
      :name="name"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import ComboBox from '../ComboBox';
import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError/index.vue';
import InputLabel from '../InputLabel/index.vue';

interface Props {
  searchable: boolean;
  name: string;
  label: string;
  error: string;
}

export default defineComponent<Props>({
  name: 'FormFieldSelect',
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
