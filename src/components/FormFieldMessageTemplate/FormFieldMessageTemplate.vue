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
      <FormFieldError v-if="errorMessage">{{ errorMessage }}</FormFieldError>
    </FormGroup>

    <div class="variables">
      <ul class="variableList">
        <li v-for="(variable, index) of variableList" :key="index">
          <span>{{ variable.label }}</span> -
          <span>{{ getKeyTemplate(variable.key) }}</span>
          <BaseButton
            variant="icon"
            :title="t('ui:emailTemplate.copy')"
            @click="copyVarTemplate(variable.key)"
          >
            <SvgIcon name="contentCopy" />
          </BaseButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import FormGroup from '../FormGroup.vue';
import FormFieldError from '../FormFieldError/index.vue';
import InputLabel from '../InputLabel/index.vue';
import BaseRichTextInput from '../BaseRichTextInput/index.vue';
import BaseTextArea from '../BaseTextArea';
import BaseButton from '../BaseButton/index.vue';
import SvgIcon from '../SvgIcon';
import useTranslation from '../../hooks/useTranslation';
import { VariableType } from '../../typings/common';

interface Props {
  value: string;
  type: 'textArea' | 'richText';
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
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'richText',
      validator: (value: string) => ['textArea', 'richText'].includes(value),
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
  setup(props: Props, context: SetupContext) {
    const { t } = useTranslation(context);

    function getKeyTemplate(key: string): string {
      return `{{${key}}}`;
    }

    function copyVarTemplate(key: string) {
      navigator.clipboard.writeText(getKeyTemplate(key)).catch(console.error);
    }

    return {
      t,
      getKeyTemplate,
      copyVarTemplate,
    };
  },
});
</script>

<style scoped lang="scss">
.form-field-message-template {
  margin-bottom: 1.5rem;

  .variables {
    .variableList {
      display: inline-block;
      list-style-type: none;

      li:not(:last-child) {
        border-bottom: 1px solid #eee;
      }
    }

    button {
      margin-left: 0.5rem;
    }
  }
}
</style>
