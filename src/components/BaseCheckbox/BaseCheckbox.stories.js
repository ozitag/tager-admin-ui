import BaseCheckbox from './index.vue';

export default { title: 'BaseCheckbox' };

export const Default = () => ({
  components: { BaseCheckbox },
  template: '<base-checkbox></base-checkbox>',
});

export const Disabled = () => ({
  components: { BaseCheckbox },
  template: '<base-checkbox disabled></base-checkbox>',
});
