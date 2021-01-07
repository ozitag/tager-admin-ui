<template>
  <form-group>
    <input-label v-if="Boolean(label)" :for="name">
      {{ fieldLabel }}
    </input-label>
    <multi-select
      :name="name"
      :options="options"
      :selected-options="selectedOptions"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <form-field-error v-if="Boolean(error)">{{ error }}</form-field-error>
  </form-group>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError/index.vue';
import InputLabel from '../InputLabel/index.vue';
import MultiSelect from '../MultiSelect/index.vue';

function isValidSelectOption(option: Option) {
  return typeof option === 'object' && 'value' in option && 'label' in option;
}

interface Option {
  [key: string]: string;
}

interface Props {
  name: string;
  label: string;
  error: string;
  options: Array<Option>;
  selectedOptions: Array<Option>;
}

export default defineComponent<Props>({
  name: 'FormFieldMultiSelect',
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    MultiSelect,
  },
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'selectedOptions',
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    error: String,
    options: {
      type: Array,
      default: () => [],
      validator(options: Array<Option>) {
        return options.every(isValidSelectOption);
      },
    },
    selectedOptions: {
      type: Array,
      default: () => [],
      validator(options: Array<Option>) {
        return options.every(isValidSelectOption);
      },
    },
  },
  setup(props) {
    const fieldLabel = computed(() => {
      const countLabel =
        props.options.length > 0
          ? `(${props.selectedOptions.length} of ${props.options.length})`
          : '';

      return [props.label, countLabel].join(' ');
    });

    return {
      fieldLabel,
    };
  },
});
</script>

<style scoped lang="scss"></style>
