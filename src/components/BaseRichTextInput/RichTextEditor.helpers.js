import { upload } from '@tager/admin-services';

export class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
    this.request = null;
  }

  // Starts the upload process.
  upload() {
    this.request = new XMLHttpRequest();

    // Return a promise that will be resolved when the file is uploaded.
    return this.loader.file.then((file) =>
      upload({
        file,
        params: { scenario: 'content' },
        // Update the loader's progress.
        onProgress: ({ loaded, total }) => {
          this.loader.uploadTotal = total;
          this.loader.uploaded = loaded;
        },
        xhr: this.request,
      }).then((response) => {
        return { default: response.url };
      })
    );
  }

  abort() {
    if (this.request) {
      this.request.abort();
    }
  }
}

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}
