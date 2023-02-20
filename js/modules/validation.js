const setFormValidation = ({form, inputSelector, inputErrorClass, submitButtonSelector}) => {
  const
    inputList = form.querySelectorAll(inputSelector),
    button = form.querySelector(submitButtonSelector)

  form.addEventListener('submit', e => e.preventDefault())
  inputList.forEach(input => {
    input.addEventListener('input', e => {
      const input = e.target
      validateForm(form, inputList, input, inputErrorClass, button)
    })
  })
  toggleSubmitButton(inputList, button)
}

const validateForm = (form, inputList, input, inputErrorClass, button) => {
  validateInput(form, input, inputErrorClass)
  toggleSubmitButton(inputList, button)
}

const validateInput = (form, input, inputErrorClass) => {
  const isInputValid = input.validity.valid && !!input.value.trim()
  isInputValid
    ? hideInputError(form, input, inputErrorClass)
    : showInputError(form, input, inputErrorClass)
}

const isFormValid = (inputList) => (
  [...inputList].every(input => input.validity.valid && !!input.value.trim())
)

const showInputError = (form, input, inputErrorClass) => {
  const errorElement = form.querySelector(`.${input.name}-error`)

  errorElement.textContent = input.validationMessage
  input.classList.add(inputErrorClass)
}
const hideInputError = (form, input, inputErrorClass) => {
  const errorElement = form.querySelector(`.${input.name}-error`)

  errorElement.textContent = ''
  input.classList.remove(inputErrorClass)
}
const toggleSubmitButton = (inputList, button) => {
  button.disabled = !isFormValid(inputList)
}
/**
 * Adds validation listeners to all forms with the provided selector.
 *
 * @param {Object} settings Required selectors
 * @param {string} settings.formSelector Form selector
 * @param {string} settings.inputSelector Inputs selector
 * @param {string} settings.submitButtonSelector Submit button selector
 * @param {string} settings.inputErrorClass Error modifier class for the input
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
 */
const validateFormOnOpen = (settings) => {
  const
    {form, inputSelector, submitButtonSelector, inputErrorClass} = settings,
    inputList = form.querySelectorAll(inputSelector),
    button = form.querySelector(submitButtonSelector);

  inputList.forEach(input => {
    validateForm(form, inputList, input, inputErrorClass, button)
  })
}

export {
  enableFormsValidation,
  validateFormOnOpen,
  toggleSubmitButton
}