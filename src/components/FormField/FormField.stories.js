import FormField from './index.vue';

export default { title: 'FormField' };

export const Default = () => ({
  components: { FormField },
  data() {
    return {
      email: '',
    };
  },
  template:
    '<form-field v-model="email" name="email" label="Email" type="email" />',
});

export const WithError = () => ({
  components: { FormField },
  data() {
    return {
      email: '',
    };
  },
  template:
    '<form-field v-model="email" name="email" label="Email" type="email" error="Required field" />',
});

export const Disabled = () => ({
  components: { FormField },
  data() {
    return {
      email: '',
    };
  },
  template:
    '<form-field v-model="email" name="email" label="Email" type="email" disabled />',
});

export const TextAreaField = () => ({
  components: { FormField },
  data() {
    return {
      email: '',
    };
  },
  template:
    '<form-field v-model="email" name="email" label="Description" type="textarea" error="Min length is 255 characters" />',
});
