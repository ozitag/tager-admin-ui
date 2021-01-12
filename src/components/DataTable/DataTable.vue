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

    <div ref="footerRef" class="data-table-footer">
      <div ref="footerInnerRef" class="footer-inner">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@vue/composition-api';

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
  usePagination: boolean;
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
    const footerRef = ref<HTMLElement | null>(null);
    const footerInnerRef = ref<HTMLElement | null>(null);

    function fixFooterPosition() {
      if (footerRef.value && footerInnerRef.value) {
        const rect = footerRef.value.getBoundingClientRect();

        footerInnerRef.value.style.width = `${rect.width}px`;
        footerInnerRef.value.style.position = 'fixed';
        footerInnerRef.value.style.bottom = '0';
        footerInnerRef.value.style.left = `${rect.x}px`;

        footerRef.value.style.height = `${
          footerInnerRef.value.getBoundingClientRect().height
        }px`;
      }
    }

    onMounted(() => {
      fixFooterPosition();

      window.addEventListener('resize', () => {
        fixFooterPosition();
      });
    });

    /** After data loading window inner width can be changed because of scrollbar */
    watch(() => props.rowData, fixFooterPosition);

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
      footerRef,
      footerInnerRef,
    };
  },
});
</script>

<style scoped lang="scss">
.data-table {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.data-table-footer {
  .footer-inner {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 1px solid #eee;
    background: #fff;
    font-size: 14px;
  }

  .pagination-container {
    display: flex;
    align-items: center;
    min-height: 55px;
  }
}
</style>
