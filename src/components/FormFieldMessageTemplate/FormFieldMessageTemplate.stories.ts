import FormFieldMessageTemplate from './FormFieldMessageTemplate.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { VariableType } from '../../typings/common';

export default { title: 'FormFieldMessageTemplate' };

export const TextArea = () =>
  defineComponent({
    name: 'FormFieldMessageTemplateWithTextArea',
    components: { FormFieldMessageTemplate },
    setup() {
      const value = ref<string>('');

      const variables: Array<VariableType> = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'E-Mail' },
        { key: 'message', label: 'Message' },
      ];

      return {
        value,
        variables,
      };
    },
    template: `
      <FormFieldMessageTemplate
        label="Label"
        v-model="value"
        :variable-list="variables"
        type="textArea"
        error-message="Сейчас тут выводится сообщение об ошибке"
      />
    `,
  });

export const RichText = () =>
  defineComponent({
    name: 'FormFieldMessageTemplateWithRichText',
    components: { FormFieldMessageTemplate },
    setup() {
      const value = ref<string>('');

      const variables: Array<VariableType> = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'E-Mail' },
        { key: 'message', label: 'Message' },
      ];

      return {
        value,
        variables,
      };
    },
    template: `
      <FormFieldMessageTemplate
        label="Label"
        v-model="value"
        :variable-list="variables"
        type="richText"
        error-message="Сейчас тут выводится сообщение об ошибке"
      />
    `,
  });
