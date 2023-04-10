import Popup from "./Popup";

class PopupWithConfirm extends Popup {
  constructor({baseConfig, handleSubmit}) {
    super(baseConfig);
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('form')
    this._buttonSubmit = this._form.querySelector('button')
  }

  /**
   *
   * @param {string} id
   * @param {Object} card
   */
  open(id, card) {
    this._card = card
    this._id = id
    super.open();
  }

  activateListeners() {
    super.activateListeners();
    this._form.addEventListener('submit', e => {
      e.preventDefault()
      this._handleSubmit(this._id, this._card)
    })
  }

  /**
   * Changes submit button text and disabled state
   * @param {boolean} isLoading Is loading status
   * @param {string} buttonText Button text
   */
  setLoading(isLoading, buttonText) {
    if (isLoading) {
      this._buttonSubmit.textContent = buttonText
      this._buttonSubmit.disabled = true
    } else {
      this._buttonSubmit.textContent = buttonText
      this._buttonSubmit.disabled = false
    }
  }
}

export default PopupWithConfirm