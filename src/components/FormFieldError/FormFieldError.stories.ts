import FormFieldError from './FormFieldError.vue';
import { defineComponent } from '@vue/composition-api';

export default { title: 'FormFieldError' };

export const Default = () =>
  defineComponent({
    components: { FormFieldError },
    template: '<FormFieldError>Required field</FormFieldError>',
  });
