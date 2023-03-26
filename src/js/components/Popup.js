class Popup {
  constructor({popupSelector, openedClass, closeButtonSelector}) {
    this._popupSelector = popupSelector
    this._openedClass = openedClass
    this._closeButtonSelector = closeButtonSelector
    this._popup = document.querySelector(`.${this._popupSelector}`)
  }

  open() {
    this._popup.classList.add(this._openedClass)
    document.addEventListener('keydown', this._closeOnEsc)
  }
  close() {
    this._popup.classList.remove(this._openedClass)
    document.removeEventListener('keydown', this._closeOnEsc)
  }
  activateListeners() {
    this._popup.addEventListener('mousedown', e => {
      e.stopPropagation()
      if (e.target.classList.contains(this._popupSelector) || e.target.classList.contains(this._closeButtonSelector)) {
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