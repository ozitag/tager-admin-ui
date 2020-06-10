import Vue, { PluginFunction, VueConstructor } from 'vue';

export type BaseButton = VueConstructor<Vue>;
export type BaseCheckbox = VueConstructor<Vue>;
export type FormFieldCheckbox = VueConstructor<Vue>;
export type FormField = VueConstructor<Vue>;
export type FormFieldError = VueConstructor<Vue>;
export type BaseInput = VueConstructor<Vue>;
export type BaseTextArea = VueConstructor<Vue>;
export type InputLabel = VueConstructor<Vue>;
export type MainLayout = VueConstructor<Vue>;
export type PageTitle = VueConstructor<Vue>;
export type Spinner = VueConstructor<Vue>;
export type SvgIcon = VueConstructor<Vue>;
export type Table = VueConstructor<Vue>;
export type TableCell = VueConstructor<Vue>;
export type FormGroup = VueConstructor<Vue>;
export type ImageInput = VueConstructor<Vue>;

export type AdminUiPlugin = PluginFunction<undefined>;
