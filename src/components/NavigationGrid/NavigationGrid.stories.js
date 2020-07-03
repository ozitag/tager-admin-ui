import Vue from 'vue';
import VueRouter from 'vue-router';

import NavigationGrid from './index';
import { FETCH_STATUSES } from '@tager/admin-services';

Vue.use(VueRouter);

export default { title: 'NavigationGrid' };

const router = new VueRouter({ mode: 'history' });

export const Default = () => ({
  router,
  components: { NavigationGrid },
  data() {
    return {
      navItemList: [
        {
          name: 'Presets',
          total: { status: FETCH_STATUSES.SUCCESS, value: 5 },
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
          // total: { status: FETCH_STATUSES.SUCCESS, value: 0 },
          linkList: [{ href: '/presets', label: 'Preset list' }],
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
    '<div style="padding: 2rem;"><navigation-grid :nav-items="navItemList" /></div>',
});
