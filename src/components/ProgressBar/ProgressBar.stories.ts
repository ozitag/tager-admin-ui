import ProgressBar from './ProgressBar.vue';
import { defineComponent } from '@vue/composition-api';

export default { title: 'ProgressBar' };

export const Primary = () =>
  defineComponent({
    components: { ProgressBar },
    template: `
      <ProgressBar color="primary" :percent="25"/>
    `,
  });

export const Default = () =>
  defineComponent({
    components: { ProgressBar },
    template: `<ProgressBar :percent="50"/>`,
  });
