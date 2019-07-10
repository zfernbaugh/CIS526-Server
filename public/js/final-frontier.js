/** final-frontier.js
 * JavaScript for the final frontier CMS app 
 * 
 * Place your custom JavaScript in this document 
 */

"use strict";

var readButton = document.getElementById("read-more");
readButton.addEventListener('click', function(event) {
  var dialog = document.getElementById('content');
  dialog.classList.add('expanded');
});

var closeButton = document.getElementById("close");
closeButton.addEventListener('click', function(event) {
    var card = document.getElementById('content');
    card.classList.remove('expanded');
});