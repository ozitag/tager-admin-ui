import BaseTable from './index.vue';

export default { title: 'Table' };

const defaultColumnDefs = [
  { id: 1, name: 'ID (10%)', field: 'id', style: { width: '10%' } },
  {
    id: 2,
    name: 'String cell (30%)',
    field: 'name',
    type: 'string',
  },
  {
    id: 2.5,
    name: 'Image cell',
    field: 'image.url',
    type: 'image',
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
    style: { width: '10%' },
    shouldOpenNewTab: false,
    // format: ({ row, column }) => ({
    //   href: row[column.field],
    //   label: row.linkLabel,
    // }),
  },
];
const defaultRowData = [
  {
    id: 1,
    name: 'Ivan',
    image: {
      url:
        'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg',
    },
    date: new Date().toISOString(),
    link: 'https://ozitag.com',
    linkLabel: 'Ozitag website url',
    description:
      'Some description Some description Some description Some description Some description Some description Some description Some description Some description Some description',
  },
  {
    id: 2,
    name: 'Ivan',
    image: {
      url:
        'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?cs=srgb&dl=scenic-view-of-forest-during-night-time-1252869.jpg&fm=jpg',
    },
    date: new Date().toISOString(),
    link: 'https://ozitag.com',
    linkLabel: 'Ivan website url',
    description: 'Some description',
  },
];

export const Default = () => ({
  components: { BaseTable },
  data() {
    return {
      columnDefs: defaultColumnDefs,
      rowData: defaultRowData,
    };
  },
  template: `
      <base-table :column-defs="columnDefs" :row-data="rowData" enumerable>
          <template v-slot:cell(description)="{ row, column }">
              <td :style="column.style">
                  <h4>{{ row[column.field] }}</h4>
              </td>
          </template>
      </base-table>`,
});
