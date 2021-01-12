import ComboBox from './ComboBox.vue';
import { ref, watch } from '@vue/composition-api';

export default { title: 'ComboBox' };

interface Option {
  value: string | number;
  label: string;
}

const OPTIONS: Array<Option> = [
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

const OPTIONS2: Array<Option> = [
  { value: '1', label: 'something 1' },
  { value: '2', label: 'something 2' },
  { value: '3', label: 'something 3' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: '4', label: 'something 4' },
  { value: '5', label: 'something 5' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: '6', label: 'something 6' },
  { value: '7', label: 'something 7' },
  { value: '8', label: 'something 8' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: '9', label: 'something 9' },
  { value: '10', label: 'something 10' },
  { value: '11', label: 'something 11' },
  { value: '12', label: 'something 12' },
];

export const Default = () => ({
  name: 'DefaultComboBox',
  components: { ComboBox },
  setup() {
    const options = ref<Array<Option>>(OPTIONS);
    const selected = ref<Option | null>(OPTIONS[2]); // OPTIONS[2]

    watch(selected, () => {
      console.log('selected', { ...selected.value });
    });

    function handleClick() {
      options.value = OPTIONS2;
    }

    return {
      options,
      selected,
      handleClick,
    };
  },
  template: `<div>
<!--  <button type="button" @click="handleClick">setOptions</button>-->
  <ComboBox v-model="selected" :options="options" :clearable="true" :disabled="false" />
  </div>`,
});
