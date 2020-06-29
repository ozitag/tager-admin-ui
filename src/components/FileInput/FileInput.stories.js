import FileInput from './index';

export default {
  title: 'FileInput',
};

const TEST_FILES = [
  {
    id: 174,
    mime: 'image/jpeg',
    name: 'e0cbc508796c2af24357b5f056aa2bdb0000033333.jpg',
    size: 386793,
    url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
  },
  {
    id: 175,
    mime: 'ima3ge/jpeg',
    name: 'e0cbc508796c2af24.zip',
    size: 386793,
    url: 'https://new.ozitag.com/uploads/tmp/zx/0q/Zx0qap7Hvw.jpg',
  },
  {
    id: 171,
    mime: 'image/jpeg',
    name: '1213090.jpg',
    size: 423630,
    url: 'https://new.ozitag.com/uploads/tmp/xw/s7/xWS75w2A2p.jpg',
  },
];

export const Default = () => ({
  components: { FileInput },
  data() {
    return { image: TEST_FILES[1] };
  },
  template: `
      <file-input :value="null" v-model="image"/>`,
});
