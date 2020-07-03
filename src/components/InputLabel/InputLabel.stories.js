import FormField from '../FormField';
import FormFieldCheckbox from '../FormFieldCheckbox';

export default { title: 'InputLabel' };

export const ForCommonInput = () => ({
  components: { FormField },
  template: '<form-field name="email" label="Email" type="email" />',
});

export const ForCheckbox = () => ({
  components: { FormFieldCheckbox },
  template: '<form-field-checkbox name="isValid" label="Is valid?" />',
});
