import BaseInput from './index.vue';

export default { title: 'BaseInput' };

export const Default = () => ({
  components: { BaseInput },
  template: '<base-input v-model="value"></base-input>',
});

export const Disabled = () => ({
  components: { BaseInput },
  template: '<base-input disabled></base-input>',
});
