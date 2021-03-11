import FormFieldCheckbox from './FormFieldCheckbox.vue';
import { defineComponent } from '@vue/composition-api';

export default { title: 'FormFieldCheckbox' };

export const Default = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    data() {
      return {
        isValid: false,
      };
    },
    template:
      '<FormFieldCheckbox v-model="isValid" name="isValid" label="Is valid?" />',
  });

export const WithError = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    data() {
      return {
        isValid: false,
      };
    },
    template:
      '<FormFieldCheckbox v-model="isValid" name="isValid" label="Is valid?" error="Required field" />',
  });

export const Disabled = () =>
  defineComponent({
    components: { FormFieldCheckbox },
    data() {
      return {
        isValid: false,
      };
    },
    template:
      '<FormFieldCheckbox v-model="isValid" name="isValid" label="Is valid?" disabled />',
  });
