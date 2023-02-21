/**
 * Adds validation listeners to all forms with the provided selector.
 *
 * @param {Object} settings Required selectors
 * @param {string} settings.formSelector Form selector
 * @param {string} settings.inputSelector Inputs selector
 * @param {string} settings.submitButtonSelector Submit button selector
 * @param {string} settings.inputErrorClass Error modifier class for the input
 * @param {number} settings.minLength Input minimum length with trim
 */
const enableFormsValidation = (settings) => {
  const
    {formSelector, ...props} = settings,
    forms = document.querySelectorAll(formSelector);
  forms.forEach(form => setFormValidation({form, ...props}))
}

/**
 * Validating the form passed as a parameter.
 *
 * @param {Object} settings Required selectors
 * @param {HTMLFormElement} settings.form Form element
 * @param {string} settings.inputSelector Inputs selector
 * @param {string} settings.submitButtonSelector Submit button selector
 * @param {string} settings.inputErrorClass Error modifier class for the input
 * @param {number} settings.minLength Input minimum length with trim
 */
const validateFormOnOpen = (settings) => {
  const
    {form, inputSelector, submitButtonSelector, inputErrorClass, minLength} = settings,
    inputList = form.querySelectorAll(inputSelector),
    button = form.querySelector(submitButtonSelector);

  inputList.forEach(input => {
    validateForm(form, inputList, input, inputErrorClass, button, minLength)
  })
}

const setFormValidation = ({form, inputSelector, inputErrorClass, submitButtonSelector, minLength}) => {
  const
    inputList = form.querySelectorAll(inputSelector),
    button = form.querySelector(submitButtonSelector)

  form.addEventListener('submit', e => e.preventDefault())
  inputList.forEach(input => {
    input.addEventListener('input', e => {
      const input = e.target
      validateForm(form, inputList, input, inputErrorClass, button, minLength)
    })
  })
  toggleSubmitButton(inputList, button, minLength)
}

const validateForm = (form, inputList, input, inputErrorClass, button, minLength) => {
  validateInput(form, input, inputErrorClass, minLength)
  toggleSubmitButton(inputList, button, minLength)
}

const validateInput = (form, input, inputErrorClass, minLength) => {
  const isInputValid = checkInputValidity(input, minLength)
  isInputValid
    ? toggleInputError(true, form, input, inputErrorClass)
    : toggleInputError(false, form, input, inputErrorClass)
}

const checkInputValidity = (input, minLength) => (
  input.validity.valid && input.value.trim().length >= minLength
)

const toggleInputError = (state, form, input, inputErrorClass) => {
  const errorElement = form.querySelector(`.${input.name}-error`)
  if (state) {
    errorElement.textContent = ''
    input.classList.remove(inputErrorClass)
  }
  else {
    errorElement.textContent = input.validationMessage
    input.classList.add(inputErrorClass)
  }
}

const toggleSubmitButton = (inputList, button, minLength) => {
  button.disabled = !isFormValid(inputList, minLength)
}

const isFormValid = (inputList, minLength) => (
  [...inputList].every(input => checkInputValidity(input, minLength))
)

export {
  enableFormsValidation,
  validateFormOnOpen
}