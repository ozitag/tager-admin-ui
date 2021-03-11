import DropdownMenu from './DropdownMenu.vue';
import Vue from 'vue';
import { defineComponent, ref } from '@vue/composition-api';
import VueRouter from 'vue-router';
import { DropdownMenuItemType } from '../../typings/common';

export default { title: 'DropdownMenu' };

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history' });

export const Default = () =>
  defineComponent({
    router,
    components: { DropdownMenu },
    setup() {
      function sayCow() {
        alert('coow');
      }

      const options = ref<Array<DropdownMenuItemType>>([
        {
          type: 'link',
          text: 'Change profile',
          url: '/self/profile/update',
          onClick: sayCow,
        },
        {
          type: 'link',
          text: 'Change password',
          url: '/self/password/update',
        },
        { type: 'divider' },
        { type: 'button', text: 'Logout', onClick: sayCow },
      ]);

      return {
        options,
      };
    },
    template: `
      <div style="position: relative; padding: 1rem">
        <DropdownMenu :options="options" style="top: 0; display: block"/>
      </div>
  `,
  });
