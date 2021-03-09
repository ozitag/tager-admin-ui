<template>
  <FormGroup>
    <InputLabel v-if="Boolean(label)" :for="name">
      {{ label }}
    </InputLabel>
    <MultiSelect
      :name="name"
      :options="options"
      :selected-options="computedSelectedOptions"
      v-bind="$attrs"
      @change="handleChange"
    />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api';
import { notEmpty } from '@tager/admin-services';

import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError';
import InputLabel from '../InputLabel';
import MultiSelect from '../MultiSelect';
import { OptionType } from '../../typings/common';

interface Props {
  name: string;
  label: string;
  error: string;
  options: Array<OptionType>;
  value: OptionType;
}

export default defineComponent<Props>({
  name: 'FormFieldSingleSelect',
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    MultiSelect,
  },
  inheritAttrs: false,
  model: {
    event: 'change',
    prop: 'value',
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
    },
    value: {
      type: Object,
      default: null,
    },
  },
  setup(props: Props, context: SetupContext) {
    const computedSelectedOptions = computed(() => {
      return [props.value].filter(notEmpty);
    });

    function handleChange(selectedOptions: Array<OptionType>) {
      const newValue =
        selectedOptions.length > 1
          ? selectedOptions[1]
          : selectedOptions.length === 1
          ? selectedOptions[0]
          : null;

      context.emit('change', newValue);
    }

    return {
      handleChange,
      computedSelectedOptions,
    };
  },
});
</script>

<style scoped lang="scss"></style>
