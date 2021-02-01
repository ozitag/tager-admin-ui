import FileInput from './FileInput.vue';
import FormGroup from '../FormGroup.vue';
import InputLabel from '../InputLabel/index.vue';
import { createId } from '@tager/admin-services';
import { SingleFileInputValueType } from '../../../typings';
import { defineComponent, ref } from '@vue/composition-api';

export default { title: 'FileInput' };

const TEST_FILES: Array<SingleFileInputValueType> = [
  {
    id: createId(),
    file: {
      id: 47,
      mime: 'image/png',
      name: '2.png',
      size: 29280,
      url: 'https://tager.dev.ozitag.com/uploads/tmp/5x/fp/5xFpgWRkl8.png',
    },
  },
  {
    id: createId(),
    file: {
      id: 174,
      mime: 'image/jpeg',
      name: 'e0cbc508796c2af24357b5f056aa2bdb0000033333.jpg',
      size: 386793,
      url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
    },
  },
  {
    id: createId(),
    file: {
      id: 175,
      mime: 'ima3ge/jpeg',
      name: 'e0cbc508796c2af24.zip',
      size: 386793,
      url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
    },
  },
  {
    id: createId(),
    file: {
      id: 171,
      mime: 'image/jpeg',
      name: '1213090.jpg',
      size: 423630,
      url: 'https://new.ozitag.com/uploads/tmp/xw/s7/xWS75w2A2p.jpg',
    },
  },
  {
    id: createId(),
    file: {
      id: 121371,
      mime: 'image/jpeg',
      name: '12131312090.jpg',
      size: 422133630,
      url: 'https://b1.filmpro.ru/c/419809.1200xp.jpg',
    },
  },
];

export const Default = () =>
  defineComponent({
    components: { FileInput },
    setup() {
      const image = ref<SingleFileInputValueType>(TEST_FILES[2]);

      return {
        image,
      };
    },
    template: `
      <file-input :value="null" v-model="image" />
    `,
  });

export const WithUploadByUrl = () =>
  defineComponent({
    components: { FileInput, FormGroup, InputLabel },
    setup() {
      const image = ref<SingleFileInputValueType>(TEST_FILES[2]);

      return {
        image,
      };
    },
    template: `
    <form-group>
      <input-label>Label</input-label>
      <file-input :value="null" v-model="image"/>
    </form-group>
  `,
  });

export const Multiple = () =>
  defineComponent({
    components: { FileInput },
    setup() {
      const images = ref<Array<SingleFileInputValueType>>(TEST_FILES);

      return {
        images,
      };
    },
    template: `
    <file-input :value="null" v-model="images" multiple with-captions/>
  `,
  });
