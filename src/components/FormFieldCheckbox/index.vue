<template>
  <form-group>
    <base-checkbox
      :id="name"
      :name="name"
      :value="value"
      :checked="checked"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <input-label v-if="Boolean(label)" for-checkbox :for="name">
      {{ label }}
    </input-label>
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import BaseCheckbox from '../BaseCheckbox/index.vue';
import FormGroup from '../FormGroup.vue';
import InputLabel from '../InputLabel/index.vue';
import FormFieldError from '../FormFieldError/index.vue';

interface Props {
  name: string;
  label: string;
  checked: boolean;
  value: boolean;
  error: string;
}

export default defineComponent<Props>({
  name: 'FormFieldCheckbox',
  components: {
    BaseCheckbox,
    FormGroup,
    FormFieldError,
    InputLabel,
  },
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    checked: Boolean,
    value: Boolean,
    error: String,
  },
});
</script>

<style scoped lang="scss">
label {
  border-radius: 3px;
  transition: box-shadow 0.15s ease-in-out;
}

input:not(:disabled):focus + label,
input:not(:disabled):active + label {
  box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);
}
</style>
