<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">{{ label }}</InputLabel>

    <slot></slot>

    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { Nullable } from '@tager/admin-services';

import FormGroup from './FormGroup.vue';
import FormFieldError from './FormFieldError/index.vue';
import InputLabel from './InputLabel/index.vue';

type Props = {
  name: string;
  label: string;
  error: Nullable<string>;
};

export default defineComponent<Props>({
  name: 'FormFieldWrapper',
  components: { FormGroup, FormFieldError, InputLabel },
  props: {
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    error: { type: String, default: null },
  },
});
</script>

<style scoped></style>
