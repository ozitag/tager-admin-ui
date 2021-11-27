import Vue, { PluginFunction, VueConstructor } from 'vue';
import { FetchStatus, FileType, Nullable } from '@tager/admin-services';
import {KeyValueCellValue, ShortCodeParamType} from '../src/typings/common';
import { ComputedRef, Ref, SetupContext } from '@vue/composition-api';
import { ResponseBody } from '@tager/admin-services/src/common.types';
import { Modifier, OptionsGeneric } from '@popperjs/core';
import { TFunction } from 'i18next';
import ResizeObserver from 'resize-observer-polyfill';
import { Route } from 'vue-router';

export type LinkType = {
  url: string;
  text: string;
};

export type ShortCodeItemType = {
  readonly name: string;
  readonly params: Array<ShortCodeParamType>;
};

export type IconName =
  | 'article'
  | 'home'
  | 'group'
  | 'viewList'
  | 'expandLess'
  | 'expandMore'
  | 'edit'
  | 'delete'
  | 'upload'
  | 'clear'
  | 'close'
  | 'menu'
  | 'search'
  | 'settings'
  | 'assignment'
  | 'chevronLeft'
  | 'chevronRight'
  | 'description'
  | 'arrowDownward'
  | 'arrowUpward'
  | 'north'
  | 'south'
  | 'email'
  | 'removeCircle'
  | 'sms'
  | 'contentCopy'
  | 'openInNew'
  | 'addCircle'
  | 'fileAvi'
  | 'fileCss'
  | 'fileCsv'
  | 'fileDoc'
  | 'fileHtml'
  | 'fileJs'
  | 'fileMp3'
  | 'fileMp4'
  | 'filePdf'
  | 'filePpt'
  | 'filePsd'
  | 'fileTxt'
  | 'fileUnknown'
  | 'fileXls'
  | 'fileXml'
  | 'fileZip'
  | 'web'
  | 'openInBrowser'
  | 'done';

export type OptionType<V = string> = {
  value: V;
  label: string;
  disabled?: boolean;
};

export interface ColorOptionType<V = number> {
  value: V;
  label: string;
  color?: string;
  imageUrl?: string;
  disabled?: boolean;
}

export interface StepType {
  title: string;
}

export type DateCellValue = Date | null;
export type ColorCellValue = string | null;
export type StringCellValue = string | null;
export type ImageCellValue = string | null;
export type LinkCellValue = LinkType | string | null;
export type NameCellValue =
  | {
      adminLink: LinkType & { subtext?: string };
      paramList?: Array<{ name: string; value: string }> | null;
      websiteLink?: LinkType | null;
    }
  | string
  | null;
export type FileCellValue = Nullable<FileType>;

export type ColumnType =
  | 'string'
  | 'date'
  | 'datetime'
  | 'image'
  | 'link'
  | 'html'
  | 'color'
  | 'file';

type RowDataDefaultType = { [key: string]: any };

export type ColumnParamsArg<RowData> = {
  row: RowData;
  column: ColumnDefinition<RowData>;
  rowIndex: number;
};

export interface ColumnDefinitionCommon<RowData = RowDataDefaultType> {
  id: number;
  name: string;
  field: string;
  type?: string | ((params: ColumnParamsArg<RowData>) => string);
  format?: (params: ColumnParamsArg<RowData>) => any;
  class?: any;
  style?: string | object[] | object;
  headStyle?: string | object[] | object;
  useCustomDataCell?: boolean;
  options?: Record<string, any>;
}

export interface ColumnDefinitionDynamic<RowData = RowDataDefaultType> {
  id: number;
  name: string;
  field: string;
  type: (params: ColumnParamsArg<RowData>) => string;
  format?: (params: ColumnParamsArg<RowData>) => any;
  class?: any;
  style?: string | object[] | object;
  headStyle?: string | object[] | object;
  useCustomDataCell?: boolean;
  options?: Record<string, any>;
}

export interface ColumnDefinitionString<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type?: 'string';
  format?: (params: ColumnParamsArg<RowData>) => StringCellValue;
}

export interface ColumnDefinitionLink<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'link';
  format?: (params: ColumnParamsArg<RowData>) => LinkCellValue;
  options?: {
    shouldOpenNewTab?: boolean;
    shouldUseRouter?: boolean;
  };
}

export interface ColumnDefinitionHtml<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'html';
  format?: (params: ColumnParamsArg<RowData>) => StringCellValue;
}

export interface ColumnDefinitionImage<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'image';
  format?: (params: ColumnParamsArg<RowData>) => ImageCellValue;
  options?: {
    justifyContent?: string;
  };
}

export interface ColumnDefinitionDate<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'date';
  format?: (params: ColumnParamsArg<RowData>) => DateCellValue;
}

export interface ColumnDefinitionDateTime<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'datetime';
  format?: (params: ColumnParamsArg<RowData>) => DateCellValue;
}

export interface ColumnDefinitionColor<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'color';
  format?: (params: ColumnParamsArg<RowData>) => ColorCellValue;
}

export interface ColumnDefinitionName<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'name';
  format?: (params: ColumnParamsArg<RowData>) => NameCellValue;
  options?: {
    shouldOpenNewTab?: boolean;
    shouldUseRouter?: boolean;
  };
}

export interface ColumnDefinitionFile<RowData = RowDataDefaultType>
  extends ColumnDefinitionCommon<RowData> {
  type: 'file';
  format?: (params: ColumnParamsArg<RowData>) => FileCellValue;
}

export interface ColumnDefinitionKeyValue<RowData = RowDataDefaultType> extends ColumnDefinitionCommon<RowData> {
  type: 'key-value';
  format?: (params: ColumnParamsArg<RowData>) => KeyValueCellValue;
}

export type ColumnDefinition<RowData = RowDataDefaultType> =
  | ColumnDefinitionDynamic<RowData>
  | ColumnDefinitionString<RowData>
  | ColumnDefinitionDate<RowData>
  | ColumnDefinitionDateTime<RowData>
  | ColumnDefinitionImage<RowData>
  | ColumnDefinitionLink<RowData>
  | ColumnDefinitionHtml<RowData>
  | ColumnDefinitionColor<RowData>
  | ColumnDefinitionName<RowData>
  | ColumnDefinitionKeyValue<RowData>
  | ColumnDefinitionFile<RowData>;

export type NavigationGridItem = {
  name: string;
  url?: string;
  total?: { status: FetchStatus; value: number; url?: string };
  linkList?: Array<LinkType>;
};

/** Toast */
export type ToastVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary'
  | 'info';

export type ToastParams = {
  variant: ToastVariant;
  title: string;
  body: string;
};

export type ToastItem = ToastParams & {
  id: number;
};

export type ToastFunction = (params: ToastParams) => void;

declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $toast: ToastFunction;
    $previousRoute: Route | null;
  }
  interface VueConstructor {
    $toast: ToastFunction;
    $previousRoute: Route | null;
  }
}

export declare const ToastPlugin: PluginFunction<undefined>;
export declare const ToastProvider: VueConstructor<Vue>;

export declare const BaseButton: VueConstructor<Vue>;
export declare const BaseCheckbox: VueConstructor<Vue>;
export declare const BaseInput: VueConstructor<Vue>;
export declare const NumberInput: VueConstructor<Vue>;
export declare const BaseTextArea: VueConstructor<Vue>;
export declare const BaseRichTextInput: VueConstructor<Vue>;
export declare const BaseSelect: VueConstructor<Vue>;
export declare const ColorInput: VueConstructor<Vue>;

export declare const FormFieldCheckbox: VueConstructor<Vue>;
export declare const FormField: VueConstructor<Vue>;
export declare const FormFieldSelect: VueConstructor<Vue>;
export declare const FormGroup: VueConstructor<Vue>;
export declare const FormFieldError: VueConstructor<Vue>;
export declare const FormFieldRichTextInput: VueConstructor<Vue>;
export declare const FormFieldFileInput: VueConstructor<Vue>;
export declare const FormFieldColorInput: VueConstructor<Vue>;
export declare const FormFieldNumberInput: VueConstructor<Vue>;
export declare const FormFieldMultiSelect: VueConstructor<Vue>;
export declare const FormFieldSingleSelect: VueConstructor<Vue>;
export declare const FormFieldUrlAliasInput: VueConstructor<Vue>;
export declare const FormFieldComboBox: VueConstructor<Vue>;
export declare const FormFieldMessageTemplate: VueConstructor<Vue>;

export declare const MultiSelect: VueConstructor<Vue>;
export declare const InputLabel: VueConstructor<Vue>;
export declare const PageTitle: VueConstructor<Vue>;
export declare const Spinner: VueConstructor<Vue>;
export declare const SvgIcon: VueConstructor<Vue>;
export declare const BaseTable: VueConstructor<Vue>;
export declare const TableCell: VueConstructor<Vue>;
export declare const FileInput: VueConstructor<Vue>;
export declare const NavigationGrid: VueConstructor<Vue>;
export declare const LoadableImage: VueConstructor<Vue>;
export declare const DropdownMenu: VueConstructor<Vue>;
export declare const TabList: VueConstructor<Vue>;
export declare const ButtonField: VueConstructor<Vue>;
export declare const MapField: VueConstructor<Vue>;
export declare const DateTimeInput: VueConstructor<Vue>;
export declare const ShortCodeConstructor: VueConstructor<Vue>;
export declare const CountButton: VueConstructor<Vue>;
export declare const FormFieldRecommendedLengthInput: VueConstructor<Vue>;
export declare const DataTable: VueConstructor<Vue>;
export declare const SearchInput: VueConstructor<Vue>;
export declare const Pagination: VueConstructor<Vue>;
export declare const ComboBox: VueConstructor<Vue>;
export declare const SeoFieldGroup: VueConstructor<Vue>;
export declare const AjaxSelect: VueConstructor<Vue>;
export declare const ColorSelect: VueConstructor<Vue>;
export declare const FormFooter: VueConstructor<Vue>;
export declare const Tag: VueConstructor<Vue>;
export declare const Steps: VueConstructor<Vue>;
export declare const AdvancedSearch: VueConstructor<Vue>;
export declare const Code: VueConstructor<Vue>;

export type DropdownMenuItemType = {
  type: 'button' | 'link' | 'divider';
  text?: string;
  url?: string;
  onClick?: (event: Event) => void;
  style?: any;
  class?: any;
};

export declare const AdminUiPlugin: PluginFunction<undefined>;

export declare function formatDate(date: Date): string;
export declare function formatDateTime(date: Date): string;
export declare function formatTime(date: Date): string;
export declare function formatBoolean(value: any): string;
export declare function createTabErrorFinder(
  errors: Record<string, string>
): (fieldList: Array<string>) => boolean;

export type TabType = {
  id: string;
  label: string;
  hasErrors?: boolean;
};

export declare const FINAL_NUMBER_REGEXP: string;
export declare const INTERMEDIATE_NUMBER_REGEXP: string;
export declare const INTERMEDIATE_INTEGER_REGEXP: string;
export declare const DOT_REGEXP: string;

export declare function floatParser(
  currentValue: string,
  previousValue: string
): string;
export declare function integerParser(
  currentValue: string,
  previousValue: string
): string;

export type SingleFileInputValueType = {
  id: string;
  file: FileType;
  caption?: Nullable<string>;
};

export declare function useSearch(
  context: SetupContext
): [Ref<string>, (newQuery: string) => void];

type TableChangeEvent = { type: 'SEARCH_UPDATE'; payload: string };

interface TableState<T, M = unknown> {
  meta: ComputedRef<M>;
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

interface TableDataRequestParams {
  searchQuery?: string;
  pageNumber?: number;
  pageSize?: number;
}

export declare function useDataTable<T>(params: {
  fetchEntityList: (
    requestParams: TableDataRequestParams
  ) => Promise<ResponseBody<Array<T>>>;
  initialValue?: Array<T>;
  resourceName?: string;
  context: SetupContext;
  pageSize?: number;
}): TableState<T>;

export declare function usePagination(params: {
  context: SetupContext;
  pageSize?: number;
}): { pageNumber: Ref<number>; pageSize: Ref<number> };

export declare function useOnClickOutside(
  ref: Ref<HTMLElement | null>,
  handler: (event: Event) => void
): void;

type PopperHookOptions = Partial<
  OptionsGeneric<Partial<Modifier<string, { offset: number[] }>>>
>;

export declare function usePopper(
  referenceRef: Ref<Element | null>,
  popperRef: Ref<HTMLElement | null>,
  options?: PopperHookOptions
): {
  show: () => void;
  hide: () => void;
};

export declare function cutUrlOrigin(url: string): string;

export declare function useSelectOptions<
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
};

export declare function useSelectOptionsResource<
  EntityType,
  Option extends OptionType<string | number>
>(params: {
  fetchEntityList: (params: {
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
  status: Ref<FetchStatus>;
};

export declare function useCopyToClipboard(
  timeout?: number
): [Ref<boolean>, (text: string) => Promise<void>];

export interface SeoChangeEvent {
  title: string;
  description: string;
  keywords: string;
  image: SingleFileInputValueType | null;
}

export interface TagerFormSubmitEvent {
  type:
    | 'save'
    | 'save_exit'
    | 'create'
    | 'create_exit'
    | 'create_create-another';
}

export declare function useTranslation(context: SetupContext): { t: TFunction };

type FirstConstructorArgument<T> = T extends new (callback: infer C) => any
  ? C
  : never;

export declare function useResizeObserver<T extends Element>(
  element: Ref<T | null>,
  callback: FirstConstructorArgument<typeof ResizeObserver>
): void;

export declare function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [Ref<T>, (value: T) => void];

export interface VariableType {
  key: string;
  label: string;
}

type ParamValue = string | (string | null)[];
type QueryType = { [key in string]?: ParamValue };

export declare function getFilterParamAsString(
  query: QueryType,
  key: string
): string | null;

export declare function getFilterParamAsNumber(
  query: QueryType,
  key: string
): number | null;

export declare function getFilterParamAsStringArray(
  query: QueryType,
  key: string
): Array<string>;

export declare function getFilterParamAsNumberArray(
  query: QueryType,
  key: string
): Array<number>;

export declare function getFilterParams(
  filters: Record<string, string | number | Array<string> | Array<number>>
): Record<string, string | Array<string>>;

export interface FilterTagType {
  value: string;
  label: string;
  name: string;
  title: string;
}
