import Vue from 'vue';
import VueRouter from 'vue-router';

import NavigationGrid from './index';
import { FETCH_STATUSES } from '@tager/admin-services';

export default { title: 'NavigationGrid' };

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history' });

export const Default = () => ({
  router,
  components: { NavigationGrid },
  data() {
    return {
      navItemList: [
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.SUCCESS, value: 5, url: '/presets' },
          linkList: [
            { url: '/presets', text: 'Preset list' },
            { url: '/presets/create', text: 'Create preset' },
          ],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.LOADING, value: 21 },
          linkList: [{ url: '/presets', text: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.SUCCESS, value: 37 },
          linkList: [{ url: '/presets', text: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.SUCCESS, value: 281 },
          linkList: [
            { url: '/presets', text: 'Preset list' },
            { url: '/presets/create', text: 'Create preset' },
          ],
        },
        {
          name: 'Presets',
          url: '/presets',
          // total: { status: FETCH_STATUSES.SUCCESS, value: 0 },
          // linkList: [{ url: '/presets', text: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.LOADING, value: 115 },
          // linkList: [{ url: '/presets', text: 'Preset list' }],
        },
      ],
    };
  },
  template:
    '<div style="padding: 2rem; background-color: #f3f3f3"><navigation-grid :nav-items="navItemList" /></div>',
});
