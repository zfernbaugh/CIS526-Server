/** @function generateCardHTML 
 * Generates the appropriate HTML for the supplied card data 
 * @param {object} cardData - An object describing a card 
 * @returns {string} the generated HTML 
 */
module.exports = function generateCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    switch (cardData.type) {
        case "audio":
            return generateAudioCardHTML(cardData);
        case "video":
            return generateVideoCardHTML(cardData);
        case "gallery":
            return generateGalleryCardHTML(cardData);
        case "article":
            return generateArticleCardHTML(cardData);
    }
}

/** @function generateAudioCardHTML
 * A helper function to generate audio card HTML 
 * @param {object} cardData - the audio card data 
 * @returns {string} the generated html 
 */
function generateAudioCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var html = `
        <h2>${cardData.title}</h2>
        <audio controls src="${decodeURIComponent(cardData.source)}">Unable to load</audio>
        <p>${cardData.description}</p>
        `
    return html;
}

/** @function generateArticleCardHTML
 * A helper function to generate article card HTML 
 * @param {object} cardData - the article card data 
 * @returns {string} the generated html 
 */
function generateArticleCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    return cardData.body;
}

/** @function generateGalleryCardHTML
 * A helper function to generate gallery card HTML 
 * @param {object} cardData - the gallery card data 
 * @returns {string} the generated html 
 */
function generateGalleryCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var images = cardData.images.map(function(image) {
      return `<img src="${decodeURIComponent(image)}">`;
    });
    var html = `
        <h2>${cardData.title}</h2>
        <div id="flex">
            <div>
                ${cardData.description}
            </div>
            ${images.join("")}
        </div>
        `
    return html;
}

/** @function generateVideoCardHTML
 * A helper function to generate video card HTML 
 * @param {object} cardData - the video card data 
 * @returns {string} the generated html 
 */
function generateVideoCardHTML(cardData) {
    // TODO: Generate appropriate HTML
    var html =`
        <h2>${cardData.title}</h2>
        <video controls src="${decodeURIComponent(cardData.source)}">Unable to load</video>
        <p>${cardData.description}</p>
        `
    return html;
}