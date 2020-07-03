import NavigationGrid from './index';
import Vue from 'vue';
import VueRouter from 'vue-router';

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
          total: { status: 'SUCCESS', value: 5 },
          linkList: [
            { href: '/presets', label: 'Preset list' },
            { href: '/presets/create', label: 'Create preset' },
          ],
        },
        {
          name: 'Presets',
          total: { status: 'IN_PROGRESS', value: 21 },
          linkList: [{ href: '/presets', label: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: 'SUCCESS', value: 37 },
          linkList: [{ href: '/presets', label: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: 'SUCCESS', value: 281 },
          linkList: [
            { href: '/presets', label: 'Preset list' },
            { href: '/presets/create', label: 'Create preset' },
          ],
        },
        {
          name: 'Presets',
          total: { status: 'SUCCESS', value: 0 },
          linkList: [{ href: '/presets', label: 'Preset list' }],
        },
        {
          name: 'Presets',
          total: { status: 'IN_PROGRESS', value: 115 },
          linkList: [{ href: '/presets', label: 'Preset list' }],
        },
      ],
    };
  },
  template:
    '<div style="padding: 2rem;"><navigation-grid :nav-items="navItemList" /></div>',
});
