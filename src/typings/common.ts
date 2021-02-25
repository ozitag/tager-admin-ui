import { FetchStatus, FileType, Nullable } from '@tager/admin-services';

export type ShortCodeParamType = {
  readonly name: string;
  readonly label: string;
};

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

export type ColumnType =
  | 'string'
  | 'date'
  | 'datetime'
  | 'image'
  | 'link'
  | 'html'
  | 'color';

export type RowDataDefaultType = { [key: string]: any };

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
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: string | object[] | object;
  // eslint-disable-next-line @typescript-eslint/ban-types
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: string | object[] | object;
  // eslint-disable-next-line @typescript-eslint/ban-types
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

export type DropdownMenuItemType = {
  type: 'button' | 'link' | 'divider';
  text?: string;
  url?: string;
  onClick?: (event: Event) => void;
  style?: any;
  class?: any;
};

export type SingleFileInputValueType = {
  id: string;
  file: FileType;
  caption?: Nullable<string>;
};

export interface SeoChangeEvent {
  title: string;
  description: string;
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

export interface VariableType {
  key: string;
  label: string;
}
