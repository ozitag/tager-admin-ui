export type OptionType<V = string> = {
  value: V;
  label: string;
};

export type ShortCodeParamType = {
  readonly name: string;
  readonly label: string;
};

export type ShortCodeItemType = {
  readonly name: string;
  readonly params: Array<ShortCodeParamType>;
};

export type LinkType = {
  url: string;
  text: string;
};
