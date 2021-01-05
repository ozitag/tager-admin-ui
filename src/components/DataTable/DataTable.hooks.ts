import { ResponseBody } from '@tager/admin-services/src/common.types';
import {
  ComputedRef,
  onMounted,
  Ref,
  SetupContext,
  watch,
} from '@vue/composition-api';
import { Nullable, useResource } from '@tager/admin-services';
import { useSearch } from '../SearchInput/SearchInput.hooks';
import { TableChangeEvent } from './DataTable.types';

interface TableDataRequestParams {
  searchQuery?: string;
}

interface TableState<T> {
  isLoading: ComputedRef<boolean>;
  rowData: Ref<Array<T>>;
  errorMessage: Ref<Nullable<string>>;
  searchQuery: Ref<string>;
  setSearchQuery: (newSearchQuery: string) => void;
  handleChange: (event: TableChangeEvent) => void;
  fetchEntityList: () => Promise<void>;
}

export function useDataTable<T>(params: {
  fetchEntityList: (
    requestParams?: TableDataRequestParams
  ) => Promise<ResponseBody<Array<T>>>;
  initialValue?: Array<T>;
  resourceName?: string;
  context: SetupContext;
}): TableState<T> {
  const [searchQuery, setSearchQuery] = useSearch(params.context);

  const [
    fetchEntityList,
    { loading: isLoading, data: rowData, error: errorMessage },
  ] = useResource<Array<T>>({
    fetchResource: () =>
      params.fetchEntityList({ searchQuery: searchQuery.value }),
    initialValue: params.initialValue ?? [],
    context: params.context,
    resourceName: params.resourceName,
  });

  onMounted(() => {
    fetchEntityList();
  });

  watch(searchQuery, () => {
    fetchEntityList();
  });

  function handleChange(event: TableChangeEvent): void {
    switch (event.type) {
      case 'SEARCH_UPDATE': {
        setSearchQuery(event.payload);
      }
    }
  }

  return {
    isLoading,
    rowData,
    errorMessage,
    searchQuery,
    setSearchQuery,
    handleChange,
    fetchEntityList,
  };
}
