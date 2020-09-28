import { defineComponent } from '@vue/composition-api';

import ShortCodeConstructor from './ShortCodeConstructor.vue';
import { ShortCodeItemType } from '../../typings/common';

export default { title: 'ShortCodeConstructor' };

const shortCodeConfigList: Array<ShortCodeItemType> = [
  {
    name: 'post',
    params: [
      {
        name: 'id',
        label: 'Post ID',
      },
    ],
  },
  {
    name: 'button',
    params: [
      {
        name: 'label',
        label: 'Button Label',
      },
      {
        name: 'url',
        label: 'URL',
      },
    ],
  },
];

export const Default = () =>
  defineComponent({
    components: { ShortCodeConstructor },
    setup() {
      return { shortCodeConfigList };
    },
    template: `
      <ShortCodeConstructor :short-code-config-list="shortCodeConfigList" label="Shortcode field" />`,
  });
