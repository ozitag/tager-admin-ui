import FormFieldComboBox from './FormFieldComboBox.vue';
import { ref, watch } from '@vue/composition-api';
import { OptionType } from '../../typings/common';

export default { title: 'FormFieldComboBox' };

const OPTIONS2: Array<OptionType> = [
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'chocolate34', label: 'Chocolate' },
  { value: 'Zambia', label: 'Zambia' },
  { value: 'Zimbabwe', label: 'Zimbabwe' },
  { value: 'vanilla657', label: 'Vanilla' },
  { value: '6', label: 'something 6' },
  { value: '7', label: 'something 7' },
  { value: '8', label: 'something 8' },
  { value: 'strawberry456', label: 'Strawberry' },
  { value: '9', label: 'something 9' },
  { value: '10', label: 'something 10' },
  { value: '11', label: 'something 11' },
  { value: '12', label: 'something 12' },
  { value: '31', label: 'something 1' },
  { value: '213', label: 'something 2' },
  { value: '3123', label: 'something 3' },
  { value: 'chocolate54', label: 'Chocolate' },
  { value: '4546', label: 'something 4' },
  { value: '534', label: 'something 5' },
  { value: 'vanilla42', label: 'Vanilla' },
  { value: '6234', label: 'something 6' },
  { value: '7567', label: 'something 7' },
  { value: '845', label: 'something 8' },
  { value: 'strawberry231', label: 'Strawberry' },
  { value: '9345', label: 'something 9' },
  { value: '1067', label: 'something 10' },
  { value: '11567', label: 'something 11' },
  { value: '12345', label: 'something 12' },
  { value: '17567', label: 'something 1' },
  { value: '278', label: 'something 2' },
  { value: '378', label: 'something 3' },
  { value: 'chocolate2', label: 'Chocolate' },
  { value: '4567', label: 'something 4' },
  { value: '5567', label: 'something 5' },
  { value: 'vanilla21', label: 'Vanilla' },
  { value: '634', label: 'something 6' },
  { value: '7867', label: 'something 7' },
  { value: '8678', label: 'something 8' },
  { value: 'strawberry1', label: 'Strawberry' },
  { value: '9345', label: 'something 9' },
  { value: '1057', label: 'something 10' },
  { value: '1178', label: 'something 11' },
  { value: '1289', label: 'something 12' },
];

export const Default = () => ({
  name: 'DefaultFormFieldComboBox',
  components: { FormFieldComboBox },
  setup() {
    const options = ref<Array<OptionType>>(OPTIONS2);
    const selected = ref<OptionType | null>(OPTIONS2[2]);

    watch(selected, () => {
      console.log('selected', { ...selected.value });
    });

    return {
      options,
      selected,
    };
  },
  template: `<FormFieldComboBox v-model="selected" :options="options" :clearable="true" :disabled="false" name="DefaultFormFieldComboBox" label="Is valid?" error="Required field" />`,
});
