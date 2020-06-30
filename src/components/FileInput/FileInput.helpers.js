/**
 * @typedef UploadedFile
 * @property {number} id
 * @property {string} url
 * @property {string} name
 * @property {number} size
 * @property {string} mime
 */

/**
 * @param {UploadedFile} file
 * @returns {function(mimeTypeList: Array<string>, extensionList: Array<string>): boolean}
 */
function createTypeValidator(file) {
  return function isValidType(mimeTypeList, extensionList) {
    return (
      mimeTypeList.some((mimeType) => file.mime.includes(mimeType)) ||
      extensionList.some((ext) => file.name.endsWith(ext))
    );
  };
}

/**
 * Reference:
 * https://github.com/nginx/nginx/blob/master/conf/mime.types
 *
 * @param {UploadedFile} file
 * @returns {string} icon name
 */
export function getFileIconName(file) {
  const isValidType = createTypeValidator(file);

  if (isValidType(['video/x-msvideo'], ['.avi'])) {
    return 'fileAvi';
  }
  if (isValidType(['text/css'], ['.css'])) {
    return 'fileCss';
  }
  if (isValidType([], ['.csv'])) {
    return 'fileCsv';
  }
  if (
    isValidType(
      [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ],
      ['.doc', '.docx']
    )
  ) {
    return 'fileDoc';
  }
  if (isValidType(['text/html'], ['.html'])) {
    return 'fileHtml';
  }
  if (isValidType(['application/javascript'], ['.js', '.jsx', '.ts', '.tsx'])) {
    return 'fileJs';
  }
  if (isValidType(['audio/mpeg'], ['.mp3'])) {
    return 'fileMp3';
  }
  if (isValidType(['video/mp4'], ['.mp4'])) {
    return 'fileMp4';
  }
  if (isValidType(['application/pdf'], ['.pdf'])) {
    return 'filePdf';
  }
  if (
    isValidType(
      [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ],
      ['.ppt', '.pptx']
    )
  ) {
    return 'filePpt';
  }
  if (isValidType([], ['.psd'])) {
    return 'filePsd';
  }
  if (isValidType(['text/plain'], ['.txt'])) {
    return 'fileTxt';
  }
  if (
    isValidType(
      [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
      ['.xls', '.xlsx']
    )
  ) {
    return 'fileXls';
  }
  if (isValidType(['text/xml'], ['.xml'])) {
    return 'fileXml';
  }
  if (isValidType(['application/zip'], ['.zip', '.rar', '.tar'])) {
    return 'fileZip';
  }

  return 'fileUnknown';
}

export function isFileObject(image) {
  return (
    typeof image === 'object' &&
    typeof image?.id === 'number' &&
    typeof image?.url === 'string' &&
    typeof image?.name === 'string' &&
    typeof image?.size === 'number' &&
    typeof image?.mime === 'string'
  );
}

export function logPropsValidationErrors({ value, multiple }) {
  if (multiple) {
    if (!Array.isArray(value) || !value.every(isFileObject)) {
      const message = JSON.stringify(
        {
          message: 'ImageInput: value should be Array<ImageType>',
          value,
          multiple,
        },
        null,
        4
      );
      console.error(message);
    }
  } else {
    if (!isFileObject(value) && value !== null) {
      const message = JSON.stringify(
        {
          message: 'ImageInput: value should be ImageType or null',
          value,
          multiple,
        },
        null,
        4
      );
      console.error(message);
    }
  }
}

export function validateValue(value) {
  return Array.isArray(value)
    ? value.every(isFileObject)
    : isFileObject(value) || value === null;
}
