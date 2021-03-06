<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">
      {{ fieldLabel }}
    </InputLabel>
    <MultiSelect
      :name="name"
      :options="options"
      :selected-options="selectedOptions"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

import { OptionType } from '../../../typings';
import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import MultiSelect from '../MultiSelect';

function isValidSelectOption(option: OptionType) {
  return typeof option === 'object' && 'value' in option && 'label' in option;
}

interface Props {
  name: string;
  label: string;
  error: string;
  options: Array<OptionType>;
  selectedOptions: Array<OptionType>;
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
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
    selectedOptions: {
      type: Array,
      default: () => [],
      validator(options: Array<OptionType>) {
        return options.every(isValidSelectOption);
      },
    },
  },
  setup(props: Props) {
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
