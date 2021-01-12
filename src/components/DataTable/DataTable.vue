<template>
  <div class="data-table">
    <SearchInput
      v-show="useSearch"
      :value="searchQuery"
      @change="handleSearchChange"
    />

    <BaseTable
      :column-defs="columnDefs"
      :row-data="rowData"
      :loading="loading"
      :error-message="errorMessage"
    >
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </BaseTable>

    <div ref="tableFooterElement" class="data-table-footer">
      <div
        v-if="usePagination && pagination.pageCount > 1"
        class="pagination-container"
      >
        <Pagination
          v-bind="pagination"
          @change:page-number="handlePageNumberChange"
          @change:page-size="handlePageSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import BaseTable from '../BaseTable';
import SearchInput from '../SearchInput';
import Pagination from '../Pagination';
import { ColumnDefinition, RowDataDefaultType } from '../../typings/common';
import { TableChangeEvent } from './DataTable.types';

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
}

interface Props {
  columnDefs: Array<ColumnDefinition>;
  rowData: Array<RowDataDefaultType>;
  loading: boolean;
  errorMessage: string | null;
  searchQuery: string;
  useSearch: boolean;
  pagination: PaginationProps;
}

export default defineComponent<Props>({
  name: 'DataTable',
  components: { BaseTable, SearchInput, Pagination },
  props: {
    columnDefs: {
      type: Array,
      required: true,
    },
    rowData: {
      type: Array,
      required: true,
    },
    loading: Boolean,
    errorMessage: {
      type: String,
      default: null,
    },
    searchQuery: {
      type: String,
      default: '',
    },
    pagination: {
      type: Object,
      default: () => ({}),
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
    useSearch: {
      type: Boolean,
      default: true,
    },
    usePagination: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    function dispatchChangeEvent(event: TableChangeEvent): void {
      context.emit('change', event);
    }

    function handleSearchChange(searchQuery: string): void {
      context.emit('change:search', searchQuery);
      dispatchChangeEvent({ type: 'SEARCH_UPDATE', payload: searchQuery });
    }

    function handlePageNumberChange(pageNumber: number): void {
      context.emit('change:page-number', pageNumber);
      dispatchChangeEvent({ type: 'PAGE_NUMBER_UPDATE', payload: pageNumber });
    }

    function handlePageSizeChange(pageSize: number): void {
      context.emit('change:page-size', pageSize);
      dispatchChangeEvent({ type: 'PAGE_SIZE_UPDATE', payload: pageSize });
    }

    return {
      handleSearchChange,
      handlePageNumberChange,
      handlePageSizeChange,
    };
  },
});
</script>

<style scoped lang="scss">
.data-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.table-container {
  height: 100%;
  margin-bottom: 0;
  flex: 1;

  ::v-deep table tr:last-child td {
    border-bottom: 0;
  }
}

.data-table-footer {
  position: sticky;
  bottom: -1rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #eee;
  background: #fff;
  font-size: 14px;

  .pagination-container {
    display: flex;
    align-items: center;
    min-height: 55px;
  }
}
</style>
