const fs = require('fs');
const path = require('path');
const serveFile = require('./serve-file');

/** @function serveIndex~callback 
 * @param {string|object} error - any error encountered by 
 * serveIndex().
 */

/** @module serveIndex
 * Serves the provided index.html file or generates 
 * a dynamic listing of a directory's contents
 * @param {string} path - the path to the directory
 * @param {http.serverResponse} res - the response object
 * @param {serveIndex~callback} callback - the callback to 
 * invoke once execution finishes
 */
module.exports = function serveIndex(dirPath, res, callback) {
  // TODO: serve appropriate index
  serveFile(path.join("public", dirPath, 'index.nsp'), res, function(err) {
    if(err) serveIndexListing(dirPath, res, callback);
    else callback(null);
  });
}

/** @function generateIndex 
 * Generates a HTML page listing the contents
 * of a directory. 
 * @param {string} dirPath - the path to the directory
 * @param {generateIndex~callback} callback - a callback to invoke 
 * once execution completes.
 */
function generateIndexHTML(dirPath, callback) {
  fs.readdir(path.join("public", dirPath), function(err, items){
    if(err) return err;
    var pathname = path.join("..", dirPath);
    
    // Create Links
    var links = items.map(function(item) {
      return `<li><a href="${path.join(pathname, item)}">${item}</a></li>`;
    });
    
    // Generate HTML
    var html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Index of ${pathname}</title>
        <head>
        <body>
          <h1>Index of ${pathname}</h1>
          <ul>
            <li><a href="${path.join(pathname, "..")}">..</a></li>
            ${links.join("")}
          <ul>
        </body>
      <html>
    `
    // Invoke callback
    callback(null,html);
  });
}

/** @callback serveIndexListing~callback
 * @param {string|object} err - any error that occured 
 */

/** @function serveIndexListing()
 * Serves a HTML list of directory contents 
 * @param {string} directoryPath - the path to the directory 
 * @param {http.serverResponse} res - the repsonse object
 * @param {serveIndexListing~callback} callback - a callback to 
 * invoke once execution finishes.
 */
function serveIndexListing(path, res, callback) {
  // TODO: generate and serve listing
  generateIndexHTML(path, function(err, html) {
    // TODO: serve listing 
    if(err) return callback(err);
    
    // Serve html
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
  });
}