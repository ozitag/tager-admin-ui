import BaseButton from './index.vue';

export default { title: 'Button' };

export const Button = () => ({
  components: { BaseButton },
  template: '<base-button variant="outline-secondary"></base-button>',
});
