const fs = require('fs');
const path = require('path');
const determineContentType = require('./determine-content-type');
const interpretServerPage = require('./interpret-server-page');

/** @function serveFile~callback 
 * @param {string|object} error - any error encountered by 
 * serveFile().
 */

/** @module serveFile 
 * Provides a function for serving files in the public 
 * directory matching the supplied filePath
 * @param {string} filePath - the path to the file
 * @param {http.serverResponse} res - the response object
 * @param {serveFile~callback} callback - a callback 
 * function to invoke once the asynchronous process
 * completes.
 */
module.exports = function serveFile(filePath, res, callback) {
    if(path.extname(filePath) === '.nsp') {
        interpretServerPage(filePath, res, function(err){
            if(err) return callback(err);
        });
      } else {
        // Read the file asynchronously
        fs.readFile(filePath, function(err, body){
            if(err) return callback(err);

            // Set the Content-Length
            res.setHeader("Content-Length", body.length);
            res.setHeader("Content-Type", determineContentType(filePath));
            // Serve the file data
            res.end(body);
        });
      }
    
    
}