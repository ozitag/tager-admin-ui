import FormField from './FormField.vue';
import { defineComponent } from '@vue/composition-api';

export default { title: 'FormField' };

export const Default = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: '',
      };
    },
    template:
      '<FormField v-model="email" name="email" label="Email" type="email" />',
  });

export const WithError = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: '',
      };
    },
    template:
      '<FormField v-model="email" name="email" label="Email" type="email" error="Required field" />',
  });

export const Disabled = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: '',
      };
    },
    template:
      '<FormField v-model="email" name="email" label="Email" type="email" disabled />',
  });

export const TextAreaField = () =>
  defineComponent({
    components: { FormField },
    data() {
      return {
        email: '',
      };
    },
    template:
      '<FormField v-model="email" name="email" label="Description" type="textarea" error="Min length is 255 characters" />',
  });
