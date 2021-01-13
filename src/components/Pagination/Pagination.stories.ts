import { defineComponent } from '@vue/composition-api';
import Pagination from './Pagination.vue';

export default { title: 'Pagination' };

export const Default = () =>
  defineComponent({
    components: { Pagination },
    template: `<Pagination :page-count="2" :page-number="1" :page-size="10" :page-sizes="[10, 30, 50, 100]" />`,
  });
