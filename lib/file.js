//$(function(){
function onInitFs(fs) {
  fs.root.getFile('d.png', {create: true}, function(fileEntry) {

      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function(e) {
          console.log('Write completed.');
        };

        fileWriter.onerror = function(e) {
          console.log('Write failed: ' + e.toString());
        };

        // Create a new Blob and write it to log.txt.
        //var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
          var blob = new Blob([xhr.response],{type:'image/png'});

        fileWriter.write(blob);
        //readFile(fs);

      }, errorHandler);

    }, errorHandler);
}
function readFile(fs) {

  //fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
  fs.root.getFile('d.png', {}, function(fileEntry) {

  console.log('Got file');

// Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         var txtArea = document.createElement('textarea');
         txtArea.value = this.result;
         document.body.appendChild(txtArea);
       };

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

  //console.log(fileEntry.isFile );
  //console.log(fileEntry.name);
  //console.log(fileEntry.fullPath );
    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'


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
function requestFS(){
  if(window.webkitRequestFileSystem){
    console.log('webkitRequestFileSystem');
    window.webkitRequestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
  }
  else {
    console.log('requestFileSystem');
    window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
  }
  }
//});
