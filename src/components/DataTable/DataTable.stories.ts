import DataTable from './DataTable.vue';
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
import VueRouter from 'vue-router';
import { ColumnDefinition } from '../../typings/common';
import { useDataTable } from './DataTable.hooks';

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history' });

export default { title: 'DataTable' };

const COLUMN_DEFS: Array<ColumnDefinition> = [
  {
    id: 1,
    name: 'ID',
    field: 'id',
    style: { minWidth: '50px', textAlign: 'center' },
    headStyle: { minWidth: '50px', textAlign: 'center' },
  },
  {
    id: 2,
    name: 'Popular weight',
    field: 'popularWeight',
    style: { minWidth: '128px' },
    headStyle: { minWidth: '128px' },
  },
  {
    id: 3,
    name: 'Image',
    field: 'image',
    type: 'image',
    style: { minWidth: '100px' },
    headStyle: { minWidth: '100px' },
  },
  {
    id: 4,
    name: 'Name',
    field: 'name',
    type: 'name',
    style: { minWidth: '260px' },
    headStyle: { minWidth: '260px' },
  },
  {
    id: 5,
    name: 'Price',
    field: 'price',
    style: { minWidth: '75px' },
    headStyle: { minWidth: '75px' },
    format: ({ row }) => `${row.price.toFixed(2)}$`,
  },
  {
    id: 6,
    name: 'Category',
    field: 'category',
    style: { minWidth: '200px' },
    headStyle: { minWidth: '200px' },
  },
  {
    id: 7,
    name: 'Platforms',
    field: 'platforms',
    style: { minWidth: '190px' },
    headStyle: { minWidth: '190px' },
  },
];

export const Default = () =>
  defineComponent({
    router,
    name: 'DataTable_Default',
    components: { DataTable },
    setup(props, context) {
      const {
        isLoading,
        rowData,
        errorMessage,
        searchQuery,
        handleChange,
      } = useDataTable({
        fetchEntityList: () =>
          Promise.resolve({ data: [], message: '', errors: {} }),
        initialValue: [],
        context,
        resourceName: 'Product list',
      });

      return {
        isLoading,
        errorMessage,
        rowData,
        columnDefs: COLUMN_DEFS,
        searchQuery,
        handleChange,
      };
    },
    template: `
      <DataTable
        :column-defs="columnDefs"
        :row-data="rowData"
        :loading="isLoading"
        :error-message="errorMessage"
        :search-query="searchQuery"
        @change="handleChange"
      >
        <template v-slot:cell(platforms)="{ row }">
          <ul v-if="row.platforms">
            <li v-for="platform of row.platforms" :key="platform">
              -&nbsp;{{ platform }}
            </li>
          </ul>
          <span v-else>-</span>
        </template>
      </DataTable>
  `,
  });
