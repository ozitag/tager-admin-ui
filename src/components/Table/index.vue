<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th
            v-for="column of enhancedColumnDefs"
            :key="column.id"
            :style="column.headStyle"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) of rowData" :key="row.id">
          <base-table-cell
            v-for="column of enhancedColumnDefs"
            :key="column.id"
            :row="row"
            :row-index="index"
            :column="column"
            :scoped-slot="getCellSlot(column.field)"
          ></base-table-cell>
        </tr>
      </tbody>
    </table>

    <!--    <div class="table-bottom">-->
    <!--      <span>Showing 1 to 10 of 57 entries</span>-->
    <!--      <div class="pagination">-->
    <!--        <ul>-->
    <!--          <li><button disabled>Previous</button></li>-->
    <!--          <li><button>1</button></li>-->
    <!--          <li><button>2</button></li>-->
    <!--          <li><button class="active">3</button></li>-->
    <!--          <li><button>4</button></li>-->
    <!--          <li><button>5</button></li>-->
    <!--          <li><button>Next</button></li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import kebabCase from 'lodash.kebabcase';

import BaseTableCell from './components/Cell';

export default Vue.extend({
  name: 'BaseTable',
  components: { BaseTableCell },
  props: {
    columnDefs: {
      type: Array,
      required: true,
    },
    rowData: {
      type: Array,
      required: true,
    },
    enumerable: Boolean,
    indexColumnDef: {
      type: Object,
      default: null
    },
  },
  computed: {
    enhancedColumnDefs() {
      const indexColumnDef = {
        id: 'index',
        name: '#',
        format: ({ rowIndex }) => rowIndex + 1,
        style: {
          width: '50px',
          textAlign: 'center'
        },
        headStyle: {
          textAlign: 'center'
        },
        ...this.indexColumnDef,
      }
      return this.enumerable ? [indexColumnDef, ...this.columnDefs] : this.columnDefs;
    }
  },
  methods: {
    getCellSlot(columnField) {
      const slotName = `cell(${kebabCase(columnField)})`;
      return this.$scopedSlots[slotName];
    },
  },
});
</script>

<style scoped lang="scss">
.table-container {
  max-width: 100%;
  overflow: auto;
  font-size: 0.9375rem;
}

table {
  width: 100%;
  /*max-width: 100%;*/
  border: 1px solid #e9ecef;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: transparent;
  text-align: left;
  color: var(--secondary);
}

th,
td {
  border: 1px solid #e9ecef;
  border-bottom-width: 2px;
  padding: 0.75rem;
  text-align: inherit;
}

tbody tr {
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  /*&:nth-of-type(odd) {*/
  /*  background-color: rgba(0, 0, 0, 0.05);*/
  /*}*/
}

.table-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination {
  padding: 5px 0;
  ul {
    display: flex;
    margin: 0 -5px;
  }

  li {
    padding: 0 5px;
  }

  button {
    padding: 6px 12px;
    border-radius: 3px;

    &:not(:disabled):hover {
      background-color: var(--secondary);
      color: white;
    }

    &:focus,
    &:active {
      box-shadow: 0 0 0 0.2rem rgba(11, 37, 37, 0.4);
    }

    &:disabled {
      cursor: not-allowed;
    }

    &.active {
      background-color: var(--secondary);
      color: white;
      font-weight: 600;
      cursor: default;
    }
  }
}
</style>
