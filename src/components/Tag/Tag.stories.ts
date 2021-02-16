import { defineComponent } from '@vue/composition-api';
import Tag from './Tag.vue';

export default { title: 'Tag' };

export const Default = () =>
  defineComponent({
    name: 'DefaultTag',
    components: { Tag },
    template: `<Tag :closable="true">Tag</Tag>`,
  });
