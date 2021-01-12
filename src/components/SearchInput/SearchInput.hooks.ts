import { ref, Ref, SetupContext, watch } from '@vue/composition-api';
import { getSearchParamByKey, updateSearchParam } from '../../utils/common';

const QUERY_PARAM = 'query';

export function useSearch(context: SetupContext): Ref<string> {
  const initialSearchQuery = getSearchParamByKey(QUERY_PARAM) ?? '';
  const searchQuery = ref<string>(initialSearchQuery);

  watch(searchQuery, () => {
    try {
      updateSearchParam(context.root.$router, QUERY_PARAM, searchQuery.value);
    } catch (error) {
      console.error(error);
    }
  });

  return searchQuery;
}
