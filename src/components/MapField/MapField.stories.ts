import { ref } from '@vue/composition-api';

import MapField from './MapField.vue';
import { MapFieldValueType } from './MapField.helpers';

export default { title: 'MapField' };

export const Default = () => ({
  name: 'MapField_Default',
  components: { MapField },
  setup() {
    const value = ref<MapFieldValueType>(null);

    return { value };
  },
  template: `
    <MapField
      v-model="value"
      label="Map"
    />
  `,
});
