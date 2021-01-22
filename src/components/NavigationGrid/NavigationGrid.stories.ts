import Vue from 'vue';
import VueRouter from 'vue-router';

import NavigationGrid from './NavigationGrid.vue';
import { FETCH_STATUSES } from '@tager/admin-services';
import { NavigationGridItem } from '../../typings/common';

export default { title: 'NavigationGrid' };

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history' });

const navItemList: Array<NavigationGridItem> = [
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
    total: { status: FETCH_STATUSES.LOADING, value: 212321 },
    linkList: [{ url: '/presets', text: 'Preset list' }],
  },
  {
    name: 'Presets',
    total: { status: FETCH_STATUSES.SUCCESS, value: 3712312 },
    linkList: [{ url: '/presets', text: 'Preset list' }],
  },
  {
    name: 'Presets',
    total: { status: FETCH_STATUSES.SUCCESS, value: 28123 },
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
    total: { status: FETCH_STATUSES.LOADING, value: 11523 },
    // linkList: [{ url: '/presets', text: 'Preset list' }],
  },
];

export const Default = () => ({
  router,
  components: { NavigationGrid },
  setup() {
    return {
      navItemList,
    };
  },
  template:
    '<div style="padding: 2rem; background-color: #f3f3f3"><NavigationGrid :nav-items="navItemList" /></div>',
});
