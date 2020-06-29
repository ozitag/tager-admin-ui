import Vue, { PluginFunction, VueConstructor } from 'vue';

export type DateCellValue = Date | null;
export type StringCellValue = string | null;
export type ImageCellValue = string | null;
export type LinkCellValue = { href: string; label: string } | null;
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

export type ColumnDefinition<RowData = { [key: string]: any }> = {
  id: number;
  name: string;
  field: string;
  type?: 'string' | 'date' | 'image' | 'link';
  format?: (params: { row: RowData; column: ColumnDefinition<RowData> }) => any;
};

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

export declare const MultiSelect: VueConstructor<Vue>;
export declare const InputLabel: VueConstructor<Vue>;
export declare const MainLayout: VueConstructor<Vue>;
export declare const PageTitle: VueConstructor<Vue>;
export declare const Spinner: VueConstructor<Vue>;
export declare const SvgIcon: VueConstructor<Vue>;
export declare const Table: VueConstructor<Vue>;
export declare const TableCell: VueConstructor<Vue>;
export declare const FileInput: VueConstructor<Vue>;

export declare const AdminUiPlugin: PluginFunction<undefined>;
