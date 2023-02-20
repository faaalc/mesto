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
  const isInputValid = input.validity.valid
  isInputValid
    ? hideInputError(form, input, inputErrorClass)
    : showInputError(form, input, inputErrorClass)
}

const isFormValid = (inputList) => (
  [...inputList].every(input => input.validity.valid)
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

const enableFormsValidation = ({formSelector, ...props}) => {
  const forms = document.querySelectorAll(formSelector)
  forms.forEach(form => setFormValidation({form, ...props}))
}

const validateFormOnOpen = ({formSelector, inputSelector, submitButtonSelector, inputErrorClass}) => {
  const
    inputList = formSelector.querySelectorAll(inputSelector),
    button = formSelector.querySelector(submitButtonSelector);

  inputList.forEach(input => {
    validateForm(formSelector, inputList, input, inputErrorClass, button)
  })
}

export {
  enableFormsValidation,
  validateFormOnOpen,
  toggleSubmitButton
}