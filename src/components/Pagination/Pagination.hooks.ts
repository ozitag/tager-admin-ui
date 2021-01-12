import { Ref, ref, SetupContext, watch } from '@vue/composition-api';
import { getSearchParamByKey, updateSearchParam } from '../../utils/common';

const PAGE_NUMBER_PARAM = 'pageNumber';
const PAGE_SIZE_PARAM = 'pageSize';

export function usePagination(params: {
  context: SetupContext;
  pageSize?: number;
}): { pageNumber: Ref<number>; pageSize: Ref<number> } {
  const initialPageNumber = Number(getSearchParamByKey(PAGE_NUMBER_PARAM) ?? 1);
  const initialPageSize = Number(
    getSearchParamByKey(PAGE_SIZE_PARAM) ?? params.pageSize ?? 100
  );

  const pageNumber = ref<number>(initialPageNumber);
  const pageSize = ref<number>(initialPageSize);

  watch(pageNumber, () => {
    try {
      updateSearchParam(
        params.context.root.$router,
        PAGE_NUMBER_PARAM,
        pageNumber.value
      );
    } catch (error) {
      console.error(error);
    }
  });

  watch(pageSize, () => {
    try {
      updateSearchParam(
        params.context.root.$router,
        PAGE_SIZE_PARAM,
        pageSize.value
      );
    } catch (error) {
      console.error(error);
    }
  });

  return { pageNumber, pageSize };
}
