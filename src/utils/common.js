/**
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return date.toLocaleDateString();
}

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  return date.toLocaleString();
}

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatTime(date) {
  return date.toLocaleTimeString();
}

/**
 * @param {any} value
 * @returns {string}
 */
export function formatBoolean(value) {
  return value ? 'Yes' : 'No';
}

export function isValidSelectOption(option) {
  return typeof option === 'object' && 'value' in option && 'label' in option;
}

function hasIntersections(stringArray1, stringArray2) {
  return stringArray1.some((string) => stringArray2.includes(string));
}

export function createTabErrorFinder(errors) {
  const errorKeys = Object.keys(errors);

  return function hasErrors(fieldList) {
    return hasIntersections(errorKeys, fieldList);
  };
}
