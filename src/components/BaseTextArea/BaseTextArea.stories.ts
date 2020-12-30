import BaseTextArea from './BaseTextArea.vue';

export default { title: 'BaseTextArea' };

export const Default = () => ({
  components: { BaseTextArea },
  data() {
    return {
      value: '',
    };
  },
  template: '<BaseTextArea v-model="value" />',
});

export const Disabled = () => ({
  components: { BaseTextArea },
  data() {
    return {
      value: '',
    };
  },
  template: '<BaseTextArea v-model="value" disabled />',
});
