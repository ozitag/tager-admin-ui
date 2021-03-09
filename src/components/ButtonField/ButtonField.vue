<template>
  <div class="button-field-container">
    <div class="title-row">
      <span class="field-title">{{ label }}</span>

      <BaseButton
        v-if="value"
        variant="icon"
        :title="t('ui:buttonField.remove')"
        @click="handleRemoveValue"
      >
        <SvgIcon name="removeCircle" />
      </BaseButton>
      <BaseButton
        v-else
        variant="icon"
        :title="t('ui:buttonField.add')"
        @click="handleAddValue"
      >
        <SvgIcon name="addCircle" />
      </BaseButton>
    </div>

    <div v-if="value" class="fields">
      <FormField
        :label="t('ui:buttonField.label')"
        :name="addPrefix('label')"
        :value="value.label"
        @input="handleChange('label', $event)"
      />
      <FormField
        :label="t('ui:buttonField.link')"
        :name="addPrefix('link')"
        :value="value.link"
        @input="handleChange('link', $event)"
      />
      <FormFieldCheckbox
        :label="t('ui:buttonField.isNewTab')"
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
import BaseButton from '../BaseButton';
import FormField from '../FormField';
import FormFieldCheckbox from '../FormFieldCheckbox';
import {
  ButtonFieldValueSchema,
  ButtonFieldValueType,
} from './ButtonField.helpers';
import useTranslation from '../../hooks/useTranslation';

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
    const { t } = useTranslation(context);

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
      t,
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
