import { defineComponent, ref } from '@vue/composition-api';
import FileInput from './FileInput.vue';
import { createId } from '@tager/admin-services';
import { SingleFileInputValueType } from '../../typings/common';

export default { title: 'FileInput' };

const TEST_FILES: Array<SingleFileInputValueType> = [
  {
    id: createId(),
    file: {
      id: '47',
      mime: 'image/png',
      name: '2.png',
      size: 29280,
      url: 'https://ozitag.com/logo.png',
    },
  },
  {
    id: createId(),
    file: {
      id: '174',
      mime: 'image/jpeg',
      name: 'e0cbc508796c2af24357b5f056aa2bdb0000033333.jpg',
      size: 386793,
      url: 'https://ozitag.com/logo.png',
    },
  },
  {
    id: createId(),
    file: {
      id: '175',
      mime: 'ima3ge/jpeg',
      name: 'e0cbc508796c2af24.zip',
      size: 386793,
      url: 'https://ozitag.com/logo.png',
    },
  },
  {
    id: createId(),
    file: {
      id: '171',
      mime: 'image/jpeg',
      name: '1213090.jpg',
      size: 423630,
      url: 'https://ozitag.com/logo.png',
    },
  },
];

export const Default = () =>
  defineComponent({
    components: { FileInput },
    setup() {
      const image = ref<SingleFileInputValueType | null>(TEST_FILES[2]);

      return {
        image,
      };
    },
    template: `
      <FileInput v-model="image" label='File' />
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
      <FileInput v-model="images" multiple with-captions />
    `,
  });

export const Simple = () =>
  defineComponent({
    components: { FileInput },
    setup() {
      const image = ref<SingleFileInputValueType | null>(TEST_FILES[2]);

      return {
        image,
      };
    },
    template: `
      <div style='width: 300px;'><FileInput v-model="images" :url-upload-enabled='false' /></div>
    `,
  });
