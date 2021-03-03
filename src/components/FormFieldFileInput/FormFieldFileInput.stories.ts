import FormFieldFileInput from './FormFieldFileInput.vue';
import { createId } from '@tager/admin-services';
import { SingleFileInputValueType } from '../../../typings';
import { defineComponent, ref, watch } from '@vue/composition-api';

export default { title: 'FormFieldFileInput' };

const TEST_FILES: Array<SingleFileInputValueType> = [
  {
    id: createId(),
    file: {
      id: '174',
      mime: 'image/jpeg',
      name: 'e0cbc508796c2af24357b5f056aa2bdb0000033333.jpg',
      size: 386793,
      url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
    },
    caption: 'Caption text',
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
    name: 'FormFieldFileInput_Default',
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log('File: ', file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model="file" name="file" label="Content"   />',
  });

export const WithCaption = () =>
  defineComponent({
    name: 'FormFieldFileInput_Default',
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log('File: ', file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model="file" name="file" label="Content" with-captions />',
  });

export const Multiple = () =>
  defineComponent({
    name: 'FormFieldFileInput_Default',
    components: { FormFieldFileInput },
    setup() {
      const files = ref(TEST_FILES);

      watch(files, () => {
        console.log('Files: ', files);
      });

      return {
        files,
      };
    },
    template:
      '<FormFieldFileInput v-model="files" name="files" multiple label="Content" />',
  });

export const MultipleWithCaptions = () =>
  defineComponent({
    name: 'FormFieldFileInput_Default',
    components: { FormFieldFileInput },
    setup() {
      const files = ref(TEST_FILES);

      watch(files, () => {
        console.log('Files: ', files);
      });

      return {
        files,
      };
    },
    template:
      '<FormFieldFileInput v-model="files" name="files" multiple label="Content" with-captions />',
  });

export const WithError = () =>
  defineComponent({
    name: 'FormFieldFileInput_WithError',
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log('File: ', file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model="file" name="file" label="Content" error="Required field" />',
  });

export const Disabled = () =>
  defineComponent({
    name: 'FormFieldFileInput_Disabled',
    components: { FormFieldFileInput },
    setup() {
      const file = ref(TEST_FILES[0]);

      watch(file, () => {
        console.log('File: ', file);
      });

      return {
        file,
      };
    },
    template:
      '<FormFieldFileInput v-model="file" name="file" label="Content" disabled />',
  });
