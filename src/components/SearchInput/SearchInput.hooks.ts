import { ref, Ref, SetupContext } from '@vue/composition-api';
import { getSearchParamByKey } from '../../utils/common';

export function useSearch(
  context: SetupContext
): [Ref<string>, (newQuery: string) => void] {
  const QUERY_PARAM_NAME = 'query';
  const initialSearchQuery = getSearchParamByKey(QUERY_PARAM_NAME) ?? '';
  const searchQuery = ref<string>(initialSearchQuery);

  function updateSearchParam(query: string) {
    const searchParams = new URLSearchParams(window.location.search);

    if (query) {
      searchParams.set(QUERY_PARAM_NAME, query);
    } else {
      searchParams.delete(QUERY_PARAM_NAME);
    }

    const newUrl = searchParams.toString()
      ? `${context.root.$route.path}?${searchParams.toString()}`
      : context.root.$route.path;

    if (context.root.$route.fullPath !== newUrl) {
      context.root.$router.replace(newUrl);
    }
  }

  function setSearchQuery(newQuery: string): void {
    searchQuery.value = newQuery;

    try {
      updateSearchParam(newQuery);
    } catch (error) {
      console.error(error);
    }
  }

  return [searchQuery, setSearchQuery];
}
