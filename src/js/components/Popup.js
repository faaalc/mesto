class Popup {
  /**
   * @param {Object} baseConfig Required options
   * @param {string} baseConfig.popupSelector Popup selector
   * @param {string} baseConfig.openedClass Opened modifier
   * @param {string} baseConfig.buttonCloseSelector Button close selector
   */
  constructor({popupSelector, openedClass, buttonCloseSelector}) {
    this._popupSelector = popupSelector
    this._openedClass = openedClass
    this._buttonCloseSelector = buttonCloseSelector
    this._popup = document.querySelector(`.${this._popupSelector}`)
  }

  /**
   * Opens popup, adds listener for closing on Esc button
   */
  open() {
    this._popup.classList.add(this._openedClass)
    document.addEventListener('keydown', this._closeOnEsc)
  }

  /**
   * Closes popup, removes listener for closing on Esc button
   */
  close() {
    this._popup.classList.remove(this._openedClass)
    document.removeEventListener('keydown', this._closeOnEsc)
  }

  /**
   * Activates listeners for closing popup on overlay and close button
   */
  activateListeners() {
    this._popup.addEventListener('mousedown', e => {
      e.stopPropagation()
      if (e.target.classList.contains(this._popupSelector) || e.target.classList.contains(this._buttonCloseSelector)) {
        this.close()
      }
    })
  }
  _closeOnEsc = (e) => {
    if (e.key === 'Escape') {
      this.close()
    }
  }
}

export default Popup