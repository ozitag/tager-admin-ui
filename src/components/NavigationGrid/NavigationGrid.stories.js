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
          total: { status: FETCH_STATUSES.SUCCESS, value: 5, href: '/presets' },
          linkList: [
            { href: '/presets', label: 'Preset list' },
            { href: '/presets/create', label: 'Create preset' },
          ],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.LOADING, value: 21 },
          linkList: [{ href: '/presets', label: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.SUCCESS, value: 37 },
          linkList: [{ href: '/presets', label: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.SUCCESS, value: 281 },
          linkList: [
            { href: '/presets', label: 'Preset list' },
            { href: '/presets/create', label: 'Create preset' },
          ],
        },
        {
          name: 'Presets',
          href: '/presets',
          // total: { status: FETCH_STATUSES.SUCCESS, value: 0 },
          // linkList: [{ href: '/presets', label: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.LOADING, value: 115 },
          // linkList: [{ href: '/presets', label: 'Preset list' }],
        },
      ],
    };
  },
  template:
    '<div style="padding: 2rem; background-color: #f3f3f3"><navigation-grid :nav-items="navItemList" /></div>',
});
