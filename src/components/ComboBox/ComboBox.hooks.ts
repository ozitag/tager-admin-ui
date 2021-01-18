import {
  computed,
  ComputedRef,
  ref,
  Ref,
  SetupContext,
} from '@vue/composition-api';
import { Nullable, useResource } from '@tager/admin-services';
import { ResponseBody } from '@tager/admin-services/src/common.types';
import { OptionType } from '../../typings/common';

export function useSelectOptions<
  EntityType,
  Option extends OptionType<string | number>
>(params: {
  entityList: Ref<Array<EntityType>>;
  fetchEntityList: (params: { query: string }) => Promise<void>;
  convertEntityToOption: (entity: EntityType) => Option;
  minQueryLength?: number;
}): {
  options: ComputedRef<Array<Option>>;
  noOptionsMessage: ComputedRef<string>;
  handleSearchQueryChange: (query: string) => void;
} {
  const searchQuery = ref('');
  const minQueryLength = params.minQueryLength ?? 3;

  const options = computed<Array<Option>>(() => {
    if (searchQuery.value.length < minQueryLength) {
      return [];
    }
    return params.entityList.value.map(params.convertEntityToOption);
  });

  const noOptionsMessage = computed<string>(() => {
    return searchQuery.value.length < minQueryLength
      ? `The query must be at least ${minQueryLength} characters.`
      : 'No results found';
  });

  function handleSearchQueryChange(query: string): void {
    searchQuery.value = query.trim();

    if (searchQuery.value.length >= minQueryLength) {
      params.fetchEntityList({ query: searchQuery.value });
    }
  }

  return { options, noOptionsMessage, handleSearchQueryChange };
}

export function useSelectOptionsResource<
  EntityType,
  Option extends OptionType<string | number>
>(params: {
  fetchEntityList: (requestParams: {
    query: string;
  }) => Promise<ResponseBody<Array<EntityType>>>;
  resourceName?: string;
  context: SetupContext;
  convertEntityToOption: (entity: EntityType) => Option;
  minQueryLength?: number;
}): {
  loading: ComputedRef<boolean>;
  options: ComputedRef<Array<Option>>;
  error: Ref<Nullable<string>>;
  noOptionsMessage: ComputedRef<string>;
  handleSearchQueryChange: (query: string) => void;
  fetchEntityList: (params: { query: string }) => Promise<void>;
} {
  const [fetchEntityList, { loading, data: entityList, error }] = useResource<
    Array<EntityType>,
    undefined,
    { query: string }
  >({
    fetchResource: params.fetchEntityList,
    initialValue: [],
    context: params.context,
    resourceName: params.resourceName,
  });

  const {
    options,
    noOptionsMessage,
    handleSearchQueryChange,
  } = useSelectOptions<EntityType, Option>({
    entityList,
    fetchEntityList,
    convertEntityToOption: params.convertEntityToOption,
    minQueryLength: params.minQueryLength,
  });

  return {
    loading,
    options,
    error,
    noOptionsMessage,
    handleSearchQueryChange,
    fetchEntityList,
  };
}
