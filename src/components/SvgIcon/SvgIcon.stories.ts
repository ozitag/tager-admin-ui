import SvgIcon from './SvgIcon.vue';
import { ICON_MAP } from './SvgIcon.constants';

export default { title: 'SvgIcon' };

export const All = () => ({
  components: { SvgIcon },
  data() {
    return {
      iconNames: Object.keys(ICON_MAP),
    };
  },
  template: `
      <ul style="display: flex; flex-wrap: wrap">
          <div v-for="name of iconNames" :key="name" style="text-align: center">
              <span style="display: block; margin: 0.5rem;">{{ name }}</span>
              <SvgIcon :name="name"/>
          </div>
      </ul>`,
});
