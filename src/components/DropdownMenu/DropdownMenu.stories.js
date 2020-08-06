import DropdownMenu from './index.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

export default { title: 'DropdownMenu' };

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history' });

export const Default = () => ({
  router,
  components: { DropdownMenu },
  data() {
    return {
      options: [
        {
          type: 'link',
          text: 'Change profile',
          url: '/self/profile/update',
          onClick: this.sayCow,
        },
        {
          type: 'link',
          text: 'Change password',
          url: '/self/password/update',
        },
        { type: 'divider' },
        { type: 'button', text: 'Logout', onClick: this.sayCow },
      ],
    };
  },
  methods: {
    sayCow() {
      alert('coow');
    },
  },
  template: `
      <div style="position: relative; padding: 1rem">
        <dropdown-menu :options="options" style="top: 0; display: block"/>
      </div>
  `,
});
