import VueRouter, { Route } from 'vue-router';
import {
  isAbsoluteUrl,
  isNotNullish,
  isNumber,
  Nullable,
} from '@tager/admin-services';
import { Dictionary } from 'vue-router/types/router';

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatDateTime(date: Date): string {
  return date.toLocaleString();
}

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString();
}

/**
 * @param {any} value
 * @returns {string}
 */
export function formatBoolean(value: unknown) {
  return value ? 'Yes' : 'No';
}

export function isValidSelectOption(option: unknown) {
  return (
    typeof option === 'object' &&
    option &&
    'value' in option &&
    'label' in option
  );
}

function hasIntersections(
  stringArray1: Array<string>,
  stringArray2: Array<string>
) {
  return stringArray1.some((string) => stringArray2.includes(string));
}

export function createTabErrorFinder(
  errors: Record<string, string>
): (fieldList: Array<string>) => boolean {
  const errorKeys = Object.keys(errors);

  return function hasErrors(fieldList) {
    return hasIntersections(errorKeys, fieldList);
  };
}

export const FINAL_NUMBER_REGEXP = /^[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[Ee][+-]?\d{1,2})?$/;
export const INTERMEDIATE_NUMBER_REGEXP = /^[+-]?(?:\d*(?:\.?(?:\d+(?:(?:(?:[Ee]\+)|(?:[Ee]-)|(?:[Ee]))?(?:\d{1,2})?)?)?)?)?$/;
export const INTERMEDIATE_INTEGER_REGEXP = /^[+-]?(?:\d+)?$/;
export const DOT_REGEXP = /[,/\u0431\u044E]/;
export const SPACE_REGEXP = /\s+/g;

export function floatParser(
  currentValue: string,
  previousValue: string
): string {
  /**
   * u0435 = small cyrillic "е"
   * u0443 = small cyrillic "у"
   *
   * We replace cyrillic "у", because on cyrillic keyboard
   * this character and latin "e" are located on the same button
   * We replace cyrillic "e", because this character looks exactly like latin "e"
   * */
  const parsedString = currentValue
    .replace(DOT_REGEXP, '.')
    .replace(/[\u0435\u0443]/, 'e');
  return INTERMEDIATE_NUMBER_REGEXP.test(parsedString)
    ? parsedString
    : previousValue;
}

export function integerParser(
  currentValue: string,
  previousValue: string
): string {
  return INTERMEDIATE_INTEGER_REGEXP.test(currentValue)
    ? currentValue
    : previousValue;
}

export function getWebsiteOrigin(): string {
  return process.env.VUE_APP_WEBSITE_URL || window.location.origin;
}

export function getSearchParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function getSearchParamByKey(key: string): string | null {
  return getSearchParams().get(key);
}

export function updateSearchParam(
  router: VueRouter,
  paramName: string,
  paramValue: string | number | null | undefined
): Promise<Route> {
  const convertedValue = isNumber(paramValue) ? String(paramValue) : paramValue;

  const query = { ...router.currentRoute.query, [paramName]: convertedValue };

  return router.replace({ query });
}

/**
 * Example:
 * input: "https://ozitag.com/search?query=some_text"
 * output: "/search?query=some_text"
 */
export function cutUrlOrigin(url: string): string {
  if (!isAbsoluteUrl(url)) return url;

  const urlObject = new URL(url);
  return urlObject.href.slice(urlObject.origin.length);
}

export function isScrollable(element: HTMLElement): boolean {
  return window.getComputedStyle(element).overflowY === 'auto';
}

export function getScrollableParent(element: HTMLElement | null): HTMLElement {
  return !element || element === document.body
    ? document.body
    : isScrollable(element)
    ? element
    : getScrollableParent(element.parentElement);
}

export class LocalStorageService<T> {
  defaultValue: T;
  key: string;

  constructor(key: string, defaultValue: T) {
    this.defaultValue = defaultValue;
    this.key = key;
  }

  get(): T {
    try {
      const value = window.localStorage.getItem(this.key);
      return value !== null ? (JSON.parse(value) as T) : this.defaultValue;
    } catch (error) {
      console.error(error);
      return this.defaultValue;
    }
  }

  set(value: T): void {
    try {
      window.localStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }
}

type ParamValue = string | (string | null)[];
type QueryType = { [key in string]?: ParamValue };

function getFilterValue(query: QueryType, key: string): ParamValue | undefined {
  return query[`filter[${key}]`];
}

export function getFilterParamAsString(
  query: QueryType,
  key: string
): string | null {
  const queryValue = getFilterValue(query, key);
  return typeof queryValue === 'string' ? queryValue : null;
}

export function getFilterParamAsNumber(
  query: QueryType,
  key: string
): number | null {
  const queryValue = getFilterValue(query, key);
  return typeof queryValue === 'string' ? Number(queryValue) : null;
}

export function getFilterParamAsStringArray(
  query: QueryType,
  key: string
): Array<string> {
  const queryValue = getFilterValue(query, key);

  if (Array.isArray(queryValue)) {
    return queryValue.filter(isNotNullish);
  }

  if (typeof queryValue === 'string') {
    return [queryValue];
  }

  return [];
}

export function getFilterParamAsNumberArray(
  query: QueryType,
  key: string
): Array<number> {
  const queryValue = getFilterValue(query, key);

  if (Array.isArray(queryValue)) {
    return queryValue
      .filter(isNotNullish)
      .map((item) => Number(item))
      .filter((item) => !Number.isNaN(item));
  }

  if (typeof queryValue === 'string' && !Number.isNaN(Number(queryValue))) {
    return [Number(queryValue)];
  }

  return [];
}

function normalizeFilterParam(
  value: string | number | Array<string> | Array<number>
): string | Array<string> {
  if (Array.isArray(value))
    return (value as Array<string | number>).map((element) => String(element));

  return String(value);
}

export function getFilterParams(
  filters: Record<string, string | number | Array<string> | Array<number>>
): Record<string, string | Array<string>> {
  const result: Record<string, string | Array<string>> = {};

  Object.keys(filters)
    .filter((key) => {
      const value = filters[key];
      const isEmptyArray = Array.isArray(value) && value.length === 0;

      return !isEmptyArray;
    })
    .forEach((key) => {
      result[`filter[${key}]`] = normalizeFilterParam(filters[key]);
    });

  return result;
}
