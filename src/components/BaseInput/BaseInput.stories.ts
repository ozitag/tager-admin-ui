import BaseInput from './BaseInput.vue';

export default { title: 'BaseInput' };

export const Default = () => ({
  components: { BaseInput },
  data() {
    return {
      value: '',
    };
  },
  template: '<BaseInput v-model="value" />',
});

export const Disabled = () => ({
  components: { BaseInput },
  data() {
    return {
      value: '',
    };
  },
  template: '<BaseInput v-model="value" disabled />',
});
