<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">
      {{ label }}
    </input-label>
    <base-select :id="name" :name="name" v-bind="$attrs" v-on="$listeners" />
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="js">
import Vue from 'vue';
import BaseSelect from '@/components/BaseSelect';
import FormGroup from '@/components/FormGroup';
import FormFieldError from '@/components/FormFieldError';
import InputLabel from '@/components/InputLabel';

export default Vue.extend({
  name: 'FormFieldSelect',
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    BaseSelect,
  },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
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
