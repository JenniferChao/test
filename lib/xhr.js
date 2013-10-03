$(document).ready(function() {
function onInitFs(fs) {
  console.log('root : ' + fs.root);
  fs.root.getFile('d.png', {create: true}, function(fileEntry) {

      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function(e) {
          console.log('Write completed.');
  console.log(fileEntry.isFile );
  console.log(fileEntry.name);
  console.log(fileEntry.fullPath );
        };

        fileWriter.onerror = function(e) {
          console.log('Write failed: ' + e.toString());
        };

        // Create a new Blob and write it to log.txt.
        //var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
          var blob = new Blob([xhr.response],{type:'image/png'});

        fileWriter.write(blob);
        readFile(fs);

      }, errorHandler);

    }, errorHandler);
}
function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}
function readFile(fs) {

  //fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
  fs.root.getFile('../images/background.png', {}, function(fileEntry) {
  //fs.root.getFile('d.png', {}, function(fileEntry) {

  console.log('Got file');

// Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
  document.getElementById("uploadPreview").src = e.target.result;
         //var txtArea = document.createElement('textarea');
         //txtArea.value = this.result;
         //document.body.appendChild(txtArea);
       };

       reader.readAsDataURL(file);
       //reader.readAsArrayBuffer(file);
       //reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

  //console.log(fileEntry.isFile );
  //console.log(fileEntry.name);
  //console.log(fileEntry.fullPath );
    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'


}
function requestFS(){
  //window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {

/*
  window.navigator.webkitPersistentStorage.requestQuota(1024*1024, function(grantedBytes) {
    window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
  }, function(e) {
    console.log('Reuesting quota Error', e);
  });
*/
  if(window.webkitRequestFileSystem){
    console.log('webkitRequestFileSystem');
    window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, readFile, errorHandler);
    //window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
  }
  else {
    console.log('requestFileSystem');
    window.requestFileSystem(window.TEMPORARY, 1024*1024, readFile, errorHandler);
    //window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
  }
}
    var oFReader = new FileReader();
oFReader.onloadend = function (oFREvent) {
//oFReader.onload = function (oFREvent) {
console.log('reader onload');
console.log('==========');
console.log(oFREvent);
console.log('==========');
console.log(oFREvent.target);
console.log('==========');
console.log(oFREvent.target.result);
console.log(typeof oFREvent.target.result);
  document.getElementById("uploadPreview").src = oFREvent.target.result;
};
    var xhr = new XMLHttpRequest();
function downloadPDF() {
  console.log("start");

    //var API_URL = 'https://github.com/dandanlay/test/haha';

    //var API_URL = 'http://upload.wikimedia.org/wikipedia/commons/a/a5/Apple_gray_logo.png';
    //var API_URL = 'https://github.com/dandanlay/test/blob/gh-pages/images/background.png';
    var API_URL = '../images/background.png';
    //var API_URL = 'http://127.0.0.1/haha';
    xhr.open('GET', API_URL, true);

    xhr.responseType = 'blob';
    //xhr.responseType = 'arraybuffer';

    xhr.onload = function(e) {
      console.log("onload");
      console.log("status" + this.status);

        if (this.status == 200) {
          console.log('loaded');
          console.log(e);
          console.log("response");
          console.log(xhr.response);
          console.log(typeof xhr.response);

          //var blob = new Blob([xhr.response],{type:'image/png'});
           requestFS();
          //var blob = new Blob([xhr.response],{type:'application/octet-binary'});
          //oFReader.readAsArrayBuffer(blob);
          //oFReader.readAsArrayBuffer(xhr.response);
          //oFReader.readAsDataURL(oFile);

            //var bb = new window.WebKitBlobBuilder();
            //bb.append(this.response); // Note: not xhr.responseText

            //var blob = bb.getBlob('application/pdf');
            //var blobURL = window.webkitURL.createObjectURL(blob);

            //window.open(blobURL);
        }
    };

    xhr.send();
    //xhr.send(createRequest());
    //         <img src="http://upload.wikimedia.org/wikipedia/commons/a/a5/Apple_gray_logo.png" alt="outsource"/>
}
//downloadPDF();
           requestFS();
});
