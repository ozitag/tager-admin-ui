<template>
  <div class="table-container">
    <div v-if="loading" class="table-spinner">
      <spinner size="50" />
    </div>

    <table
      v-if="useStickyHeader"
      ref="tableCloneRef"
      :class="['clone-table', { 'is-blur': loading }]"
    >
      <thead>
        <tr>
          <th
            v-for="column of enhancedColumnDefs"
            :key="column.id"
            :style="[column.headStyle]"
            :data-table-head-cell="column.field"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
    </table>

    <table ref="tableRef" :class="{ 'is-blur': loading }">
      <thead>
        <tr>
          <th
            v-for="column of enhancedColumnDefs"
            :key="column.id"
            :style="[column.headStyle]"
            :data-table-head-cell="column.field"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rowData.length === 0" class="empty">
          <td :colspan="enhancedColumnDefs.length">
            <div>
              <span v-if="!loading && !errorMessage">
                {{ notFoundMessage }}
              </span>
              <span v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </span>
            </div>
          </td>
        </tr>
        <tr v-for="(row, index) of rowData" v-else :key="row.id">
          <base-table-cell
            v-for="column of enhancedColumnDefs"
            :key="column.id"
            :row="row"
            :row-index="index"
            :column="column"
            :scoped-slot="getCellSlot(column.field)"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="js">
import { defineComponent } from '@vue/composition-api';
import kebabCase from 'lodash.kebabcase';

import Spinner from '../Spinner';
import BaseTableCell from './components/Cell.vue';
import { useStickyTableHeader } from './BaseTable.hooks';

/**
 * Table component.
 * @displayName BaseTable
 */
export default defineComponent({
  name: 'BaseTable',
  components: { BaseTableCell, Spinner },
  props: {
    /**
     * Table column definitions
     */
    columnDefs: {
      type: Array,
      required: true,
    },
    /**
     * Table row data
     */
    rowData: {
      type: Array,
      required: true,
    },
    /**
     * Should display first column with row number?
     */
    enumerable: Boolean,
    /**
     * Should display spinner?
     */
    loading: Boolean,
    /**
     * Should sticky header?
     */
    useStickyHeader: {
      type: Boolean,
      default: false,
    },
    /**
     * Definition overrides for row number column.
     */
    indexColumnDef: {
      type: Object,
      default: null,
    },
    /**
     * Message which is displayed if table doesn't have any rows
     */
    notFoundMessage: {
      type: String,
      default: 'Items not found',
    },
    /**
     * Error message, which is displayed if table data request was failed.
     */
    errorMessage: {
      type: String,
      default: null,
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
          textAlign: 'center',
        },
        headStyle: {
          width: '50px',
          textAlign: 'center',
        },
        ...this.indexColumnDef,
      };
      return this.enumerable
        ? [indexColumnDef, ...this.columnDefs]
        : this.columnDefs;
    },
  },
  methods: {
    getCellSlot(columnField) {
      const slotName = `cell(${kebabCase(columnField)})`;
      return this.$scopedSlots[slotName];
    },
  },
  setup(props) {
    const { tableRef, tableCloneRef } = useStickyTableHeader(
      props.useStickyHeader
    );

    return {
      tableRef,
      tableCloneRef,
    };
  },
});
</script>

<style scoped lang="scss">
.table-container {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 0.9375rem;
  position: relative;
  margin-bottom: 1rem;
  clip-path: inset(0);
}

table {
  width: 100%;
  height: 100%;
  border: 1px solid #e9ecef;
  border-collapse: collapse;
  background-color: transparent;
  text-align: left;
  color: var(--secondary);
  transition: 0.1s filter;
}

th,
td {
  border: 1px solid #e9ecef;
  border-bottom-width: 2px;
  padding: 0.75rem;
  text-align: inherit;
}

tr.empty {
  td {
    div {
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .error-message {
      color: var(--danger);
    }
  }

  &:hover {
    background-color: white;
  }
}

tbody tr {
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
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

.is-sticky {
  position: relative;
  z-index: 999;

  th {
    position: relative;
    background-color: #fff;
    // custom top and bottom borders
    box-shadow: inset 0px -1.5px 0px #e9ecef, inset 0px 1px 0px #e9ecef;
  }
}

.clone-table {
  position: absolute;
  top: 0;
  height: auto !important;
  background-color: #fff;
  z-index: 9999;
  opacity: 0;
}

.table-spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 400px;
}

.is-blur {
  position: relative;
  filter: blur(3px);

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(243, 243, 243, 0.25);
  }
}
</style>
