import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(config, {handleSubmit, formSelector}) {
    super(config);
    this._handleSubmit = handleSubmit
    this._form = document.querySelector(`.${formSelector}`)
  }

  _getInputValues = () => {
    const inputList = this._form.querySelectorAll('input')
    const inputValues = {}
    inputList.forEach(input => {
      inputValues[input.name] = input.value
    })
    return inputValues
  }
  activateListeners() {
    this._form.addEventListener('submit', () => {
      this._handleSubmit(this._getInputValues())
    })
    super.activateListeners()
  }
  close() {
    this._form.reset()
    super.close()
  }
}

export default PopupWithForm