import Vue, { PluginFunction, VueConstructor } from 'vue';
import { FetchStatus, FileType, Nullable } from '@tager/admin-services';
import { ShortCodeParamType } from '../src/typings/common';

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
  | 'settings'
  | 'assignment'
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
  | 'fileZip';

export type OptionType<V = string> = {
  value: V;
  label: string;
};

export type DateCellValue = Date | null;
export type ColorCellValue = string | null;
export type StringCellValue = string | null;
export type ImageCellValue = string | null;
export type LinkCellValue = LinkType | string | null;
export type NameCellValue = {
  adminLink: LinkType | string | null;
  websiteUrl: LinkType | string | null;
} | null;

export type ColumnType =
  | 'string'
  | 'date'
  | 'datetime'
  | 'image'
  | 'link'
  | 'html'
  | 'color';

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
  | ColumnDefinitionName<RowData>;

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
  }
  interface VueConstructor {
    $toast: ToastFunction;
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

export declare const MultiSelect: VueConstructor<Vue>;
export declare const InputLabel: VueConstructor<Vue>;
export declare const PageTitle: VueConstructor<Vue>;
export declare const Spinner: VueConstructor<Vue>;
export declare const SvgIcon: VueConstructor<Vue>;
export declare const Table: VueConstructor<Vue>;
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
