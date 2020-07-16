import Vue, { PluginFunction, VueConstructor } from 'vue';
import { FetchStatus } from '@tager/admin-services';

export type DateCellValue = Date | null;
export type StringCellValue = string | null;
export type ImageCellValue = string | null;
export type LinkCellValue = { href: string; label: string } | string | null;
export type IconName =
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

export type ColumnType = 'string' | 'date' | 'datetime' | 'image' | 'link';
export type ColumnParamsArg<RowData> = {
  row: RowData;
  column: ColumnDefinition<RowData>;
  rowIndex: number;
};

export type ColumnDefinition<RowData = { [key: string]: any }> = {
  id: number;
  name: string;
  field: string;
  type?: ColumnType | ((params: ColumnParamsArg<RowData>) => ColumnType);
  format?: (params: ColumnParamsArg<RowData>) => any;
  class?: any;
  style?: string | object[] | object;
  headStyle?: string | object[] | object;
  useCustomDataCell?: boolean;

  /** Link cell */
  shouldOpenNewTab?: boolean;
  shouldUseRouter?: boolean;
};

export type NavigationGridItem = {
  name: string;
  href?: string;
  total?: { status: FetchStatus; value: number; href?: string };
  linkList?: Array<{ href: string; label: string }>;
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
export declare const BaseTextArea: VueConstructor<Vue>;
export declare const BaseRichTextInput: VueConstructor<Vue>;

export declare const FormFieldCheckbox: VueConstructor<Vue>;
export declare const FormField: VueConstructor<Vue>;
export declare const FormGroup: VueConstructor<Vue>;
export declare const FormFieldError: VueConstructor<Vue>;
export declare const FormFieldRichTextInput: VueConstructor<Vue>;
export declare const FormFieldFileInput: VueConstructor<Vue>;
export declare const FormFieldMultiSelect: VueConstructor<Vue>;
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

export type DropdownMenuItemType = {
  type: 'button' | 'link' | 'divider';
  label?: string;
  href?: string;
  onClick?: (event: Event) => void;
  style?: any;
  class?: any;
};

export declare const AdminUiPlugin: PluginFunction<undefined>;

export declare function formatDate(date: Date): string;
export declare function formatDateTime(date: Date): string;
export declare function formatTime(date: Date): string;
export declare function formatBoolean(value: any): string;
