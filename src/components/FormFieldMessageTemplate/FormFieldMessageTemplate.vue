<template>
  <div class="form-field-message-template">
    <FormGroup>
      <InputLabel v-if="label">{{ label }}</InputLabel>
      <BaseRichTextInput
        v-if="type === 'richText'"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <BaseTextArea
        v-if="type === 'textArea'"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <BaseInput
        v-if="type === 'text'"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
      />
      <FormFieldError v-if="errorMessage">{{ errorMessage }}</FormFieldError>
    </FormGroup>

    <div class="variables">
      <Variable
        v-for="(variable, index) of variableList"
        :key="index"
        :variable="variable"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import BaseInput from '../BaseInput';
import BaseRichTextInput from '../BaseRichTextInput';
import BaseTextArea from '../BaseTextArea';
import BaseButton from '../BaseButton';
import SvgIcon from '../SvgIcon';
import Variable from './components/Variable';
import { VariableType } from '../../typings/common';

interface Props {
  value: string;
  type: 'text' | 'textArea' | 'richText';
  label: string;
  errorMessage: string;
  variableList: Array<VariableType>;
}

export default defineComponent<Props>({
  name: 'FormFieldMessageTemplate',
  inheritAttrs: false,
  components: {
    FormGroup,
    InputLabel,
    BaseRichTextInput,
    BaseTextArea,
    FormFieldError,
    BaseButton,
    SvgIcon,
    BaseInput,
    Variable,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'richText',
      validator: (value: string) =>
        ['text', 'textArea', 'richText'].includes(value),
    },
    label: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    variableList: {
      type: Array,
      default: [],
    },
  },
});
</script>

<style scoped lang="scss">
.form-field-message-template {
  margin-bottom: 1.5rem;

  .variables {
    display: flex;
    flex-wrap: wrap;
    margin-top: -0.5rem;
  }
}
</style>
