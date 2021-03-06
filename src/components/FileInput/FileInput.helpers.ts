import { FileType } from '@tager/admin-services';

function createTypeValidator(file: FileType) {
  return function isValidType(
    mimeTypeList: Array<string>,
    extensionList: Array<string>
  ) {
    return (
      mimeTypeList.some((mimeType) => file.mime.includes(mimeType)) ||
      extensionList.some((ext) => file.name.endsWith(ext))
    );
  };
}

/**
 * Reference:
 * https://github.com/nginx/nginx/blob/master/conf/mime.types
 */
export function getFileIconName(file: FileType) {
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
