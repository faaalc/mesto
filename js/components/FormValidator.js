class FormValidator {
  /**
   * @param {Object} settings Required selectors
   * @param {string} settings.inputSelector Inputs selector
   * @param {string} settings.submitButtonSelector Submit button selector
   * @param {string} settings.inputErrorClass Error modifier class for the input
   * @param {number} settings.minLength Input minimum length with trim
   * @param {HTMLFormElement} form Form element
   */
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inputErrorClass = settings.inputErrorClass
    this._minLength = settings.minLength
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
  validateFormOnOpen() {
    this._inputList.forEach(input => {
      this._validateForm(input)
    })
  }

  /**
   * Resetting the form after submit
   */
  resetForm() {
    this._form.reset()
    this._button.disabled = true
  }

  _setListeners() {
    this._form.addEventListener('submit', e => e.preventDefault())
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
    isInputValid
      ? this._toggleInputError(true, input)
      : this._toggleInputError(false, input)
  }

  _checkInputValidity(input) {
   return input.validity.valid && input.value.trim().length >= this._minLength
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