import axios from "axios";

export default function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload. It sounds scary but do not
    // worry — the loader will be passed into the adapter later on in this guide.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          // Prepare the form data.
          const data = new FormData();

          data.append("file", file);
          for (var value of data.values()) {
            console.log(value);
          }
          // Important note: This is the right place to implement security mechanisms
          // like authentication and CSRF protection. For instance, you can use
          // XMLHttpRequest.setRequestHeader() to set the request headers containing
          // the CSRF token generated earlier by your application.
          //this.xhr.setRequestHeader('Content-Type','multipart/form-data');
          // Send the request.
          //this.xhr.send( data );
          axios
            .post("/ckeditorupload", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data) {
                resolve({
                  default: res.data.url,
                });
              } else {
                reject(res.data.message);
              }
            })
            .catch((res) => {
              reject("Upload Failed");
            });
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

/*//console.log(res.data.url);
        var url = res.data.url;
        //const loader = this.xhr.loader;

        this.xhr.addEventListener( 'load', (resolve) => {
            const response = this.xhr.response;
        
            // ...
        
            response.urls = {default: url}
            // 	'160': '...',
            // 	'500': '...',
            // 	// ...
            // 	'1052': 'http://example.com/images/image–default-size.png'
            // }
            resolve( response.urls );
        } );

        */
