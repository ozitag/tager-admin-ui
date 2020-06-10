import BaseTextArea from './index.vue';

export default { title: 'BaseTextArea' };

export const Default = () => ({
  components: { BaseTextArea },
  template: '<base-text-area></base-text-area>',
});

export const Disabled = () => ({
  components: { BaseTextArea },
  template: '<base-text-area disabled></base-text-area>',
});
