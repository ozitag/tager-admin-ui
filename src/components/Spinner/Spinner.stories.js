import Spinner from './index.vue';

export default { title: 'Spinner' };

export const Primary30px = () => ({
  components: { Spinner },
  template: `
      <spinner style="color: var(--primary)" size="30"/>`,
});

export const Secondary50px = () => ({
  components: { Spinner },
  template: `
      <spinner style="color: var(--secondary)" size="50"/>`,
});
