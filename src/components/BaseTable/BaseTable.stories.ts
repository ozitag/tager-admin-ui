import Vue from 'vue';
import VueRouter from 'vue-router';
import BaseTable from './BaseTable.vue';
import { ColumnDefinition, RowDataDefaultType } from '../../typings/common';
import { FileType, Nullable } from '@tager/admin-services';

export default { title: 'BaseTable' };

const defaultColumnDefs: Array<ColumnDefinition> = [
  {
    id: 100,
    name: 'Name',
    type: 'name',
    field: 'name',
    style: { width: '40%' },
    format: ({ row }: RowDataDefaultType) => {
      return {
        adminLink: {
          url: '/admin/products/40',
          text: row.name,
          subtext: '3mL/R.8mR/L',
        },
        paramList: [
          { name: 'Код товара', value: '691.725' },
          { name: 'Штрих-код', value: '728360599674' },
        ],
        websiteLink: {
          url: row.url,
          text: row.url,
        },
      };
    },
  },
  {
    id: 1,
    name: 'ID (10%)',
    field: 'id',
    style: { width: '10%' },
  },
  {
    id: 2,
    name: 'String Color (30%)',
    field: 'color',
    type: 'color',
  },
  // {
  //   id: 2,
  //   name: 'String cell (30%)',
  //   field: 'name',
  //   type: 'string',
  // },
  {
    id: 2.5,
    name: 'Image cell',
    field: 'image.url',
    type: 'image',
    // style: { width: '40%' },
    // options: {
    //   justifyContent: 'flex-start',
    // },
  },
  {
    id: 2.7,
    name: 'HTML cell',
    field: 'content',
    type: 'html',
  },
  {
    id: 3,
    name: 'Date cell (30%)',
    field: 'date',
    type: 'date',
    style: {
      width: '30%',
      textAlign: 'center',
      verticalAlign: 'top',
      backgroundColor: 'wheat',
    },
  },
  {
    id: 4,
    name: 'Custom cell (20%)',
    field: 'description',
    useCustomDataCell: true,
    style: { width: '20%' },
  },
  {
    id: 5,
    name: 'Link cell (10%)',
    field: 'link',
    type: 'link',
    options: {
      // shouldOpenNewTab: false,
      // shouldUseRouter: false,
    },
    style: { width: '10%' },
    // format: ({ row, column }) => ({
    //   url: row[column.field],
    //   text: row.link,
    // }),
  },
  {
    id: 6,
    name: 'File cell',
    field: 'file',
    type: 'file',
  },
];

interface TestEntity {
  id: number;
  name: string;
  url: string;
  color: string;
  content: string;
  image: { url: string };
  date: string;
  link: string;
  description: string;
  file: Nullable<FileType>;
}

const defaultRowData: Array<TestEntity> = [
  {
    id: 1,
    name: 'Makeup Purple',
    url: 'https://banuba-catalog.dev.ozitag.com/beautification/eyes-hazel',
    color: '#374635',
    content: '<p>simple header <h3>Title</h3></p>',
    image: {
      url:
        'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg',
    },
    date: new Date().toISOString(),
    link: '/presets',
    description:
      'Some description Some description Some description Some description Some description Some description Some description Some description Some description Some description',
    file: {
      id: '80d47541-e186-481a-8add-a4a351e62b6d',
      mime: 'application/zip',
      name: 'D5rg88TvA1.zip',
      size: 1059388,
      url: 'https://presetbox.dev.ozitag.com/uploads/zip/8k/3k/8k3kXkohkb.zip',
    },
  },
  {
    id: 2,
    color: 'rgba(222,111,123,0.8)',
    name: 'Ivan',
    url:
      'https://banuba-catalog.dev.ozitag.com/interactive-background/golden-confetti',
    content: '<p>simple header <em>Title</em></p>',
    image: {
      url:
        'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg',
    },
    date: new Date().toISOString(),
    link: 'https://ozitag.com',
    description: 'Some description',
    file: {
      id: '80d47541-e186-481a-8add-a4a351e62b6d',
      mime: 'application/zip',
      name: 'D5rg88TvA1.zip',
      size: 1059388,
      url: 'https://presetbox.dev.ozitag.com/uploads/zip/8k/3k/8k3kXkohkb.zip',
    },
  },
];

Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history' });

export const Default = () => ({
  router,
  components: { BaseTable },
  data() {
    return {
      columnDefs: defaultColumnDefs,
      rowData: defaultRowData,
    };
  },
  template: `
    <base-table :column-defs="columnDefs" :row-data="rowData" enumerable :loading="false" :use-sticky-header="false">
      <template v-slot:cell(description)="{ row, column }">
        <td :style="column.style">
          <h4>{{ row[column.field] }}</h4>
        </td>
      </template>
    </base-table>
  `,
});
