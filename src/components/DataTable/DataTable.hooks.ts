import { ResponseBody } from '@tager/admin-services/src/common.types';
import {
  computed,
  ComputedRef,
  onMounted,
  Ref,
  SetupContext,
  watch,
} from '@vue/composition-api';
import { Nullable, PaginationMeta, useResource } from '@tager/admin-services';
import { useSearch } from '../SearchInput';
import { TableChangeEvent } from './DataTable.types';
import { usePagination } from '../Pagination';

interface TableDataRequestParams {
  searchQuery?: string;
  pageNumber?: number;
  pageSize?: number;
}

interface TableState<T> {
  isLoading: ComputedRef<boolean>;
  rowData: Ref<Array<T>>;
  errorMessage: Ref<Nullable<string>>;
  searchQuery: Ref<string>;
  pageNumber: Ref<number>;
  pageSize: Ref<number>;
  pageCount: ComputedRef<number>;
  handleChange: (event: TableChangeEvent) => void;
  fetchEntityList: () => Promise<void>;
}

export function useDataTable<T>(params: {
  fetchEntityList: (
    requestParams: TableDataRequestParams
  ) => Promise<ResponseBody<Array<T>>>;
  initialValue?: Array<T>;
  resourceName?: string;
  context: SetupContext;
  pageSize?: number;
}): TableState<T> {
  const searchQuery = useSearch(params.context);
  const { pageNumber, pageSize } = usePagination({
    context: params.context,
    pageSize: params.pageSize,
  });

  const [
    fetchEntityList,
    { loading: isLoading, data: rowData, error: errorMessage, meta },
  ] = useResource<Array<T>, PaginationMeta>({
    fetchResource: () =>
      params.fetchEntityList({
        searchQuery: searchQuery.value,
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
      }),
    initialValue: params.initialValue ?? [],
    context: params.context,
    resourceName: params.resourceName,
  });

  const pageCount = computed<number>(() => meta.value?.page.count ?? 0);

  onMounted(() => {
    fetchEntityList();
  });

  watch([searchQuery, pageNumber, pageSize], () => {
    fetchEntityList();
  });

  function handleChange(event: TableChangeEvent): void {
    switch (event.type) {
      case 'SEARCH_UPDATE':
        searchQuery.value = event.payload;
        pageNumber.value = 1;
        break;
      case 'PAGE_NUMBER_UPDATE':
        pageNumber.value = event.payload;
        break;
      case 'PAGE_SIZE_UPDATE':
        pageSize.value = event.payload;
        pageNumber.value = 1;
        break;
    }
  }

  return {
    isLoading,
    rowData,
    errorMessage,
    searchQuery,
    pageNumber,
    pageSize,
    pageCount,
    handleChange,
    fetchEntityList,
  };
}
