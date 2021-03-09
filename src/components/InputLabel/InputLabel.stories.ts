import FormField from '../FormField/FormField.vue';
import FormFieldCheckbox from '../FormFieldCheckbox/FormFieldCheckbox.vue';
import { defineComponent } from '@vue/composition-api';

export default { title: 'InputLabel' };

export const ForCommonInput = () =>
  defineComponent({
    components: { FormField },
    template: '<FormField name="email" label="Email" type="email" />',
  });

export const ForCheckbox = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    template: '<FormFieldCheckbox name="isValid" label="Is valid?" />',
  });
