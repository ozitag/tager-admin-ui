<template>
  <FormGroup>
    <FileInput
      :id='name'
      :label='label'
      class='file-input'
      :name='name'
      :value='value'
      :url-upload-enabled='urlUploadEnabled'
      v-bind='$attrs'
      v-on='$listeners'
    />
    <FormFieldError v-if='Boolean(error)'>{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang='ts'>
import { defineComponent } from '@vue/composition-api';
import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import FileInput from '../FileInput';
import { SingleFileInputValueType } from '../../typings/common';

interface Props {
  name: string;
  label: string;
  value: SingleFileInputValueType | Array<SingleFileInputValueType>;
  error: string;
  urlUploadEnabled: boolean | null;
}

export default defineComponent<Props>({
  name: 'FormFieldFileInput',
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    FileInput
  },
  inheritAttrs: false,
  model: {
    event: 'change'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    urlUploadEnabled: {
      type: Boolean,
      default: true
    },
    value: [Array, Object],
    error: {
      type: String,
      default: ''
    }
  }
});
</script>
