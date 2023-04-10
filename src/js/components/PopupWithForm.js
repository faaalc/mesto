import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  /**
   * @param {Object} baseConfig Required options
   * @param {string} baseConfig.popupSelector Popup selector
   * @param {string} baseConfig.openedClass Opened modifier
   * @param {string} baseConfig.buttonCloseSelector Button close selector
   * @param {Function} handleSubmit Callback for form submit
   */
  constructor({baseConfig, handleSubmit}) {
    super(baseConfig);
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector(`form`)
    this._buttonSubmit = this._form.querySelector('button')
    this._inputList = this._form.querySelectorAll('input')
  }

  /**
   * Activates base listeners, adds submit listener with passed callback, preventing form default behavior
   */
  activateListeners() {
    this._form.addEventListener('submit', e => {
      e.preventDefault()
      this._handleSubmit(this._getInputValues())
    })
    super.activateListeners()
  }

  /**
   * Overrides base close actions, adds form reset on close
   */
  close() {
    this._form.reset()
    super.close()
  }

  setLoading(isLoading, buttonText) {
    if (isLoading) {
      this._buttonSubmit.textContent = buttonText
      this._buttonSubmit.disabled = true
    } else {
      this._buttonSubmit.textContent = buttonText
      this._buttonSubmit.disabled = false
    }
  }

  _getInputValues = () => {
    const inputValues = {}
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }
}

export default PopupWithForm