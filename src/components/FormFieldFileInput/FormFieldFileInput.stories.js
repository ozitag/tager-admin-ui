import FormFieldFileInput from './index.vue';
import { createId } from '@tager/admin-services';

export default { title: 'FormFieldFileInput' };

const TEST_FILES = [
  {
    id: createId(),
    file: {
      id: 174,
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
];

export const Default = () => ({
  name: 'FormFieldFileInput_Default',
  components: { FormFieldFileInput },
  data() {
    return {
      file: TEST_FILES[0],
    };
  },
  updated() {
    console.log('File: ', this.file);
  },
  template:
    '<form-field-file-input v-model="file" name="file" label="Content"   />',
});

export const WithCaption = () => ({
  name: 'FormFieldFileInput_Default',
  components: { FormFieldFileInput },
  data() {
    return {
      file: TEST_FILES[0],
    };
  },
  updated() {
    console.log('File: ', this.file);
  },
  template:
    '<form-field-file-input v-model="file" name="file" label="Content" with-captions />',
});

export const Multiple = () => ({
  name: 'FormFieldFileInput_Default',
  components: { FormFieldFileInput },
  data() {
    return {
      files: TEST_FILES,
    };
  },
  updated() {
    console.log('Files: ', this.files);
  },
  template:
    '<form-field-file-input v-model="files" name="files" multiple label="Content" />',
});

export const MultipleWithCaptions = () => ({
  name: 'FormFieldFileInput_Default',
  components: { FormFieldFileInput },
  data() {
    return {
      files: TEST_FILES,
    };
  },
  updated() {
    console.log('Files: ', this.files);
  },
  template:
    '<form-field-file-input v-model="files" name="files" multiple label="Content" with-captions />',
});

export const WithError = () => ({
  name: 'FormFieldFileInput_WithError',
  components: { FormFieldFileInput },
  data() {
    return {
      file: TEST_FILES[0],
    };
  },
  updated() {
    console.log('Content: ', this.file);
  },
  template:
    '<form-field-file-input v-model="file" name="file" label="Content"  error="Required field" />',
});

export const Disabled = () => ({
  name: 'FormFieldFileInput_Disabled',
  components: { FormFieldFileInput },
  data() {
    return {
      file: TEST_FILES[0],
    };
  },
  template:
    '<form-field-file-input v-model="file" name="file" label="Content"  disabled />',
});
