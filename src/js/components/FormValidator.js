class FormValidator {
  /**
   * @param {Object} settings Required selectors
   * @param {string} settings.inputSelector Inputs selector
   * @param {string} settings.submitButtonSelector Submit button selector
   * @param {string} settings.inputErrorClass Error modifier class for the input
   * @param {HTMLFormElement} form Form element
   */
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inputErrorClass = settings.inputErrorClass
    this._form = form
    this._inputList = this._form.querySelectorAll(this._inputSelector)
    this._button = this._form.querySelector(this._submitButtonSelector)
  }

  /**
   * Adds validation listeners to the provided form.
   */
  enableValidation() {
    this._setListeners()
    this._toggleSubmitButton()
  }

  /**
   * Validating the form on open
   */
  forceValidateForm() {
    this._inputList.forEach(input => {
      this._validateForm(input)
    })
  }

  /**
   * Resetting the form after submit
   */
  disableSubmitButton() {
    this._button.disabled = true
  }

  _setListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', e => {
        const input = e.target
        this._validateForm(input)
      })
    })
  }

  _validateForm(input) {
    this._validateInput(input)
    this._toggleSubmitButton()
  }

  _validateInput(input) {
    const isInputValid = this._checkInputValidity(input)
    this._toggleInputError(isInputValid, input)
  }

  _checkInputValidity(input) {
   return input.validity.valid
  }

  _toggleInputError(state, input) {
    const errorElement = this._form.querySelector(`.${input.name}-error`)
    if (state) {
      errorElement.textContent = ''
      input.classList.remove(this._inputErrorClass)
    }
    else {
      errorElement.textContent = input.validationMessage
      input.classList.add(this._inputErrorClass)
    }
  }

  _toggleSubmitButton() {
    this._button.disabled = !this._isFormValid(this._inputList)
  }

  _isFormValid() {
    return [...this._inputList].every(input => this._checkInputValidity(input))
  }
}

export default FormValidator