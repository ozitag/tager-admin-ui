import { ref } from '@vue/composition-api';

import ButtonField from './ButtonField.vue';
import { ButtonFieldValueType } from './ButtonField.helpers';

export default { title: 'ButtonField' };

export const Default = () => ({
  name: 'BaseSelect_Default',
  components: { ButtonField },
  setup() {
    const value = ref<ButtonFieldValueType>({
      label: '',
      link: '',
      isNewTab: false,
    });

    return { value };
  },
  template: `
    <ButtonField
      v-model="value"
      label="CTA Button"
    />
  `,
});
