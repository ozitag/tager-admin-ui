import Vue, { PluginFunction, VueConstructor } from 'vue';

export type DateCellValue = Date | null;
export type StringCellValue = string | null;
export type ImageCellValue = string | null;
export type LinkCellValue = { href: string; label: string } | null;

export type ColumnDefinition = {
  id: number;
  name: string;
  field: string;
  type?: 'string' | 'date' | 'image' | 'link';
  format?: <T = { [key: string]: any }>(params: {
    row: T;
    column: ColumnDefinition;
  }) => any;
};

export declare const BaseButton: VueConstructor<Vue>;
export declare const BaseCheckbox: VueConstructor<Vue>;
export declare const FormFieldCheckbox: VueConstructor<Vue>;
export declare const FormField: VueConstructor<Vue>;
export declare const FormFieldError: VueConstructor<Vue>;
export declare const BaseInput: VueConstructor<Vue>;
export declare const BaseTextArea: VueConstructor<Vue>;
export declare const InputLabel: VueConstructor<Vue>;
export declare const MainLayout: VueConstructor<Vue>;
export declare const PageTitle: VueConstructor<Vue>;
export declare const Spinner: VueConstructor<Vue>;
export declare const SvgIcon: VueConstructor<Vue>;
export declare const Table: VueConstructor<Vue>;
export declare const TableCell: VueConstructor<Vue>;
export declare const FormGroup: VueConstructor<Vue>;
export declare const ImageInput: VueConstructor<Vue>;

export declare const AdminUiPlugin: PluginFunction<undefined>;
