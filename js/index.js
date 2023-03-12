import Card from "./modules/Card.js";
import FormValidator from "./modules/FormValidator.js";
import {prependElement} from './utils.js';
import {initialCards} from './data.js';


const
  popups = document.querySelectorAll('.popup'),
  forms = document.querySelectorAll('.popup__form'),
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
    openBtn: document.querySelector('.profile__add-button')
  },
  popupImage = {
    popup: document.querySelector('.popup_type_image'),
    image: document.querySelector('.popup__full-screen-image'),
    location: document.querySelector('.popup__location')
  },
  formValidationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inputErrorClass: 'popup__input_type_error',
    minLength: 2
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

  //checking the validity when opening
  const validator = new FormValidator(formValidationSettings, popup)
  validator.validateFormOnOpen()
}
const handleChangesEditPopup = e => {
  const {name, description} = e.target.elements
  popupEdit.profileName.textContent = name.value.trim()
  popupEdit.profileDescription.textContent = description.value.trim()
  closePopup(popupEdit.popup)
}

//popupAdd submit with validation
const handleSubmitPopupAdd = e => {
  const {place, link, button} = e.target.elements
  const data = {
    name: place.value,
    link: link.value
  }
  closePopup(popupAdd.popup)

  const card = new Card(data, '#card', openImagePopup)
  prependElement(card.generateCard(), gallery)
  resetPopupAdd(e, button)
}
const resetPopupAdd = (e, button) => {
  //resetting form and disabling button
  e.target.reset()
  button.disabled = true
}

//Adding validation on every form
// enableFormsValidation(formValidationSettings)
forms.forEach(form => {
  const validator = new FormValidator(formValidationSettings, form)
  validator.enableValidation()
})



//Adding closePopup listeners on buttons and overlay
popups.forEach(popup => {
  popup.addEventListener('mousedown', e => {
    e.stopPropagation()
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

//Adding popupEdit listeners
popupEdit.openBtn.addEventListener('click', () => openEditPopup(popupEdit.popup))
popupEdit.form.addEventListener('submit', handleChangesEditPopup)

// Adding popupAdd listeners
popupAdd.openBtn.addEventListener('click', () => openPopup(popupAdd.popup))
popupAdd.form.addEventListener('submit', handleSubmitPopupAdd)

//Adding cards to page form data
initialCards.forEach(cardData => {
  const card = new Card(cardData, '#card', openImagePopup)
  prependElement(card.generateCard(), gallery)
})