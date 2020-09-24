<template>
  <div class="button-field-container">
    <div class="title-row">
      <span class="field-title">{{ label }}</span>

      <BaseButton
        v-if="value"
        variant="icon"
        title="Remove"
        @click="handleRemoveValue"
      >
        <SvgIcon name="removeCircle" />
      </BaseButton>
      <BaseButton v-else variant="icon" title="Add" @click="handleAddValue">
        <SvgIcon name="addCircle" />
      </BaseButton>
    </div>

    <div v-if="value" class="fields">
      <FormField
        label="Button: Label"
        :name="addPrefix('label')"
        :value="value.label"
        @input="handleChange('label', $event)"
      />
      <FormField
        label="Button: Link"
        :name="addPrefix('link')"
        :value="value.link"
        @input="handleChange('link', $event)"
      />
      <FormFieldCheckbox
        label="Button: Is new tab?"
        :name="addPrefix('isNewTab')"
        :checked="value.isNewTab"
        @change="handleChange('isNewTab', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import kebabCase from 'lodash.kebabcase';

import SvgIcon from '../SvgIcon';
import BaseButton from '../BaseButton/index.vue';
import FormField from '../FormField/index.vue';
import FormFieldCheckbox from '../FormFieldCheckbox/index.vue';
import {
  ButtonFieldValueSchema,
  ButtonFieldValueType,
} from './ButtonField.helpers';

type NonNullableButtonFieldValueType = NonNullable<ButtonFieldValueType>;

const INITIAL_VALUE: ButtonFieldValueType = {
  label: '',
  link: '',
  isNewTab: false,
};

type Props = {
  value: ButtonFieldValueType;
  label: string;
};

export default defineComponent<Props>({
  name: 'ButtonField',
  components: { FormField, FormFieldCheckbox, BaseButton, SvgIcon },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
      default: null,
      validator(value: unknown): boolean {
        return ButtonFieldValueSchema.check(value);
      },
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    function handleChange<
      FieldName extends keyof NonNullableButtonFieldValueType
    >(
      fieldName: FieldName,
      fieldValue: NonNullableButtonFieldValueType[FieldName]
    ) {
      const currentValue = props.value ?? INITIAL_VALUE;

      const updatedValue = {
        ...currentValue,
        [fieldName]: fieldValue,
      };

      context.emit('change', updatedValue);
    }

    function addPrefix(field: string): string {
      const prefix = kebabCase(props.label);
      return [prefix, field].join('_');
    }

    function handleRemoveValue() {
      context.emit('change', null);
    }

    function handleAddValue() {
      context.emit('change', { ...INITIAL_VALUE });
    }

    return {
      addPrefix,
      handleChange,
      handleRemoveValue,
      handleAddValue,
    };
  },
});
</script>

<style scoped>
.button-field-container {
  margin-bottom: 1rem;
}

.title-row {
  display: inline-flex;
  align-items: center;
}

.field-title {
  font-size: 1.2rem;
}
.fields {
  padding-left: 1rem;
  border-left: 1px solid var(--text-color);
}
</style>
