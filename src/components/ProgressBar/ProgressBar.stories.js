import ProgressBar from './index.vue';

export default { title: 'ProgressBar' };

export const Primary = () => ({
  components: { ProgressBar },
  template: `
      <progress-bar color="primary" :percent="25"/>`,
});

export const Default = () => ({
  components: { ProgressBar },
  template: `<progress-bar :percent="50"/>`,
});
