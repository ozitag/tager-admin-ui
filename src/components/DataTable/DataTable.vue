<template>
  <div>
    <Search
      v-if="useSearch"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import BaseTable from '../BaseTable';
import Search from '../Search';
import { ColumnDefinition, RowDataDefaultType } from '../../typings/common';
import { TableChangeEvent } from './DataTable.types';

interface Props {
  columnDefs: Array<ColumnDefinition>;
  rowData: Array<RowDataDefaultType>;
  loading: boolean;
  errorMessage: string | null;
  searchQuery: string;
  useSearch: boolean;
}

export default defineComponent<Props>({
  name: 'DataTable',
  components: { BaseTable, Search },
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
  },
  setup(props, context) {
    function dispatchChangeEvent(event: TableChangeEvent): void {
      context.emit('change', event);
    }

    function handleSearchChange(searchQuery: string): void {
      context.emit('change:search', searchQuery);
      dispatchChangeEvent({ type: 'SEARCH_UPDATE', payload: searchQuery });
    }

    return {
      handleSearchChange,
    };
  },
});
</script>

<style scoped lang="scss"></style>
