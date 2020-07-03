<template>
  <form-group>
    <base-checkbox
      :id="name"
      :name="name"
      :value="value"
      :checked="checked"
      v-on="$listeners"
      v-bind="$attrs"
    />
    <input-label v-if="Boolean(label)" for-checkbox :for="name">
      {{ label }}
    </input-label>
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="js">
import Vue from 'vue';
import BaseCheckbox from '../BaseCheckbox'
import FormGroup from '../FormGroup';
import InputLabel from '../InputLabel';
import FormFieldError from '../FormFieldError';

export default Vue.extend({
  name: 'FormFieldCheckbox',
  inheritAttrs: false,
  components: {
    BaseCheckbox,
    FormGroup,
    FormFieldError,
    InputLabel,
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: String,
    checked: Boolean,
    value: Boolean,
    error: String
  }
});
</script>

<style scoped lang="scss">
label {
  transition: box-shadow 0.15s ease-in-out;
}

input:not(:disabled):focus + label,
input:not(:disabled):active + label {
  border-radius: 3px;
  box-shadow: 0 0 0 0.2rem var(--input-focus-box-shadow);
}
</style>
