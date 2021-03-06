const chokidar = require( "chokidar" ),
      { E_FILE_NAVIGATOR_UPDATED } = require( "../src/constant" );

let watcher;

module.exports = ( event, path ) => {
    // If repeating call, remove existing listeners from files
    watcher && watcher.close();

    watcher = chokidar.watch( path, {
        ignored: /[\/\\]\./,
        depth: 1,
        alwaysStat: false,
        persistent: true
    });

    watcher
      .on( "add", ( path ) => {
        event.sender.send( E_FILE_NAVIGATOR_UPDATED, path,  "add" );
      })
      .on( "addDir", ( path ) => {
        event.sender.send( E_FILE_NAVIGATOR_UPDATED, path,  "addDir" );
      })
      .on( "change", ( path ) => {
        event.sender.send( E_FILE_NAVIGATOR_UPDATED, path,  "change" );
      })
      .on( "unlink", ( path ) => {
        event.sender.send( E_FILE_NAVIGATOR_UPDATED, path,  "unlink" );
      })
      .on( "unlinkDir", ( path ) => {
        event.sender.send( E_FILE_NAVIGATOR_UPDATED, path,  "unlink" );
      })
      .on( "error", ( error ) => {
        console.log( "chokidar error:", error );
      });
};