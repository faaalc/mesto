export const BASE_URL = 'https://mesto.nomoreparties.co/v1/cohort-64/'
export const TOKEN = '94314ba6-acbc-4ef4-a856-49bf0d843156'
export const forms = document.querySelectorAll('.popup__form')
export const gallery = document.querySelector('.gallery')
export const main = document.querySelector('.main')
export const popupEditElements = {
  openBtn: document.querySelector('.profile__edit-button'),
  nameInput: document.querySelector('.popup__input_type_name'),
  descriptionInput: document.querySelector('.popup__input_type_about')
}
export const popupAddElements = {
  openBtn: document.querySelector('.profile__add-button')
}
export const popupAvatarElements = {
  openBtn: document.querySelector('.profile__avatar-container')
}
export const formValidationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error'
}
export const basePopupConfig = {
  openedClass: 'popup_opened',
  buttonCloseSelector: 'popup__close'
}
export const formValidators = {}
export const popupWithFormInstances = {}