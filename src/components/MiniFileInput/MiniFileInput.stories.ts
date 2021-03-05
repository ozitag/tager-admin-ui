import MiniFileInput from './MiniFileInput.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { SingleFileInputValueType } from '../../typings/common';
import { createId } from '@tager/admin-services';

export default { title: 'MiniFileInput' };

const TEST_FILES: Array<SingleFileInputValueType> = [
  {
    id: createId(),
    file: {
      id: '47',
      mime: 'image/png',
      name: '2.png',
      size: 29280,
      url: 'https://tager.dev.ozitag.com/uploads/tmp/5x/fp/5xFpgWRkl8.png',
    },
  },
  {
    id: createId(),
    file: {
      id: '174',
      mime: 'image/jpeg',
      name: 'e0cbc508796c2af24357b5f056aa2bdb0000033333.jpg',
      size: 386793,
      url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
    },
  },
  {
    id: createId(),
    file: {
      id: '175',
      mime: 'ima3ge/jpeg',
      name: 'e0cbc508796c2af24.zip',
      size: 386793,
      url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
    },
  },
  {
    id: createId(),
    file: {
      id: '171',
      mime: 'image/jpeg',
      name: '1213090.jpg',
      size: 423630,
      url: 'https://new.ozitag.com/uploads/tmp/xw/s7/xWS75w2A2p.jpg',
    },
  },
];

export const Default = () =>
  defineComponent({
    name: 'DefaultMiniFileInput',
    components: { MiniFileInput },
    setup() {
      const value = ref<SingleFileInputValueType | null>(TEST_FILES[0]);

      return {
        value,
      };
    },
    template: `<MiniFileInput v-modal="value" />`,
  });

export const Multiple = () =>
  defineComponent({
    name: 'DefaultMiniFileInput',
    components: { MiniFileInput },
    setup() {
      const value = ref<Array<SingleFileInputValueType>>(TEST_FILES);

      return {
        value,
      };
    },
    template: `<MiniFileInput v-modal="value" :multiple="true" />`,
  });
