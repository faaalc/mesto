class ErrorBlock {
  constructor({text, templateSelector}) {
    this._text = text
    this._templateSelector = templateSelector
  }
  /**
   * Generates and returns HTML element
   * @returns {HTMLElement} HTML ErrorBlock Element
   */
  generateBlock() {
    this._element = this._getTemplate()
    const title = this._element.querySelector('.error-block__title')

    title.textContent = this._text

    return this._element
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.error-block')
      .cloneNode(true);
  }
}
export default ErrorBlock