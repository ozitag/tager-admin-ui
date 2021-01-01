import BaseCheckbox from './BaseCheckbox.vue';

export default { title: 'BaseCheckbox' };

export const Default = () => ({
  components: { BaseCheckbox },
  data() {
    return {
      value: '',
    };
  },
  template: '<BaseCheckbox v-model="value" checked="true" />',
});

export const Disabled = () => ({
  components: { BaseCheckbox },
  template: '<BaseCheckbox disabled />',
});
