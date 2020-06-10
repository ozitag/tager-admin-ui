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
