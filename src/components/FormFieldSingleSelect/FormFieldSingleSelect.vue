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
      @update:selected-options="handleChange"
    />
    <FormFieldError v-if="Boolean(error)">{{ error }}</FormFieldError>
  </FormGroup>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, SetupContext } from "vue";

import { notEmpty } from "@tager/admin-services";

import FormGroup from "../FormGroup.vue";
import FormFieldError from "../FormFieldError";
import InputLabel from "../InputLabel";
import MultiSelect from "../MultiSelect";
import { OptionType } from "../../typings/common";

interface Props {
  name: string;
  label: string;
  error: string;
  options: Array<OptionType>;
  value: OptionType | null;
}

export default defineComponent({
  name: "FormFieldSingleSelect",
  components: {
    FormGroup,
    FormFieldError,
    InputLabel,
    MultiSelect,
  },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    options: {
      type: Array as PropType<Array<OptionType>>,
      default: () => [],
    },
    value: {
      type: Object as PropType<OptionType | null>,
      default: null,
    },
  },
  emits: ["update:value"],
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

      context.emit("update:value", newValue);
    }

    return {
      handleChange,
      computedSelectedOptions,
    };
  },
});
</script>

<style scoped lang="scss"></style>
