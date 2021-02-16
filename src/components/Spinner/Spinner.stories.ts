import { defineComponent } from '@vue/composition-api';
import Spinner from './Spinner.vue';

export default { title: 'Spinner' };

export const Primary30px = () =>
  defineComponent({
    components: { Spinner },
    template: `
      <Spinner style="color: var(--primary)" size="30"/>`,
  });

export const Secondary50px = () =>
  defineComponent({
    components: { Spinner },
    template: `
      <Spinner style="color: var(--secondary)" size="50"/>`,
  });
