import VueRouter, { Route } from 'vue-router';
import { isAbsoluteUrl, isNumber } from '@tager/admin-services';

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
