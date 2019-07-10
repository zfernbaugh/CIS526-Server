const fs = require('fs');
const url = require('url');
const path = require('path');
const vm = require('vm');

/** @function interpretServerPage() 
 * Serves a server page, interpreting any 
 * JavaScript embedded within and concatenating 
 * it back into the page.
 * @param {string} filePath - the path to the file
 * @param {http.serverResponse} res - Response object
 * @param {serveFile~callback} callback - a callback
 * function to invoke once the asynchronous process
 * completes.
 */
module.exports = function interpretServerPage(filePath, res, callback) {

    // Read the file
    fs.readFile(filePath, {encoding: "utf-8"}, function(err, body){
        if(err) return callback(err);
        
        // TODO: Interpret the page
        var script = "`" + body.replace('`', '\`') + "`";
        var sandbox = {
            cards: require(`../data/cards.json`),
            generateCardHtml: require('../src/generate-card-html')
        }
        try {
            var html = vm.runInNewContext(script, sandbox);
            // TODO: Serve the HTML
            res.setHeader("Content-Type", "text/html");
            res.setHeader("Content-Length", html.length);
            res.end(html);
        } catch(err) {
            console.log(err);
            res.statusCode = 500;
            res.statusMessage = "Server Error";
            res.end();
        }
    });
}