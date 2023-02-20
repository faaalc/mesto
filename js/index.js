import generateCard from './modules/card.js';
import {prependElement} from './utils.js';
import {initialCards} from './data.js';

const
  popupCloseButtons = document.querySelectorAll('.popup__close'),
  gallery = document.querySelector('.gallery'),
  popupEdit = {
    popup: document.querySelector('.popup_type_edit'),
    form: document.querySelector('.popup__form_edit-description'),
    openBtn: document.querySelector('.profile__edit-button'),
    nameInput: document.querySelector('.popup__input_type_name'),
    descriptionInput: document.querySelector('.popup__input_type_description'),
    profileName: document.querySelector('.profile__name'),
    profileDescription: document.querySelector('.profile__description')
  },
  popupAdd = {
    popup: document.querySelector('.popup_type_add'),
    form: document.querySelector('.popup__form_add-card'),
    openBtn: document.querySelector('.profile__add-button'),
    placeInput: document.querySelector('.popup__input_type_place'),
    linkInput: document.querySelector('.popup__input_type_link')
  },
  popupImage = {
    popup: document.querySelector('.popup_type_image'),
    image: document.querySelector('.popup__full-screen-image'),
    location: document.querySelector('.popup__location')
  };

//Popup general functions
const closePopup = popup => {
  popup.classList.add('hide')
  popup.classList.remove('show')
  document.removeEventListener('keydown', closePopupOnEscape)
}
const closePopupOnEscape = e => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.show')
    closePopup(popup)
  }
}
const openPopup = popup => {
  popup.classList.remove('hide')
  popup.classList.add('show')
  document.addEventListener('keydown', closePopupOnEscape)
}

//popupImage open
const openImagePopup = e => {
  openPopup(popupImage.popup)
  popupImage.image.src = e.target.src
  popupImage.image.alt = e.target.alt
  popupImage.location.textContent = e.target.alt
}

//popupEdit open and submit
const openEditPopup = popup => {
  openPopup(popup)
  popupEdit.nameInput.value = popupEdit.profileName.textContent
  popupEdit.descriptionInput.value = popupEdit.profileDescription.textContent

  const
    inputList = popupEdit.form.querySelectorAll('.popup__input'),
    button = popupEdit.form.querySelector('.popup__save')
  inputList.forEach(input => {
    validateForm(
      popupEdit.form,
      inputList,
      input,
      'popup__input_type_error',
      button
    )
  })
}
const handleChangesEditPopup = () => {
  popupEdit.profileName.textContent = popupEdit.nameInput.value
  popupEdit.profileDescription.textContent = popupEdit.descriptionInput.value
  closePopup(popupEdit.popup)
}

//popupAdd submit with validation
const handleSubmitPopupAdd = e => {
  const data = {
    name: popupAdd.placeInput.value,
    link: popupAdd.linkInput.value
  }
  closePopup(popupAdd.popup)
  prependElement(generateCard(data, openImagePopup), gallery)
  popupAdd.form.reset()
}

//Adding closePopup listeners
popupCloseButtons.forEach(btn => {
  btn.addEventListener('click', e => closePopup(e.target.closest('.popup')))
})

//Adding popupEdit listeners
popupEdit.openBtn.addEventListener('click', () => openEditPopup(popupEdit.popup))
popupEdit.form.addEventListener('submit', handleChangesEditPopup)

// Adding popupAdd listeners
popupAdd.openBtn.addEventListener('click', () => openPopup(popupAdd.popup))
popupAdd.form.addEventListener('submit', handleSubmitPopupAdd)

//Adding cards to page form data
initialCards.forEach(card => prependElement(generateCard(card, openImagePopup), gallery))





/////////FORMS

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

enableFormsValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error'
})