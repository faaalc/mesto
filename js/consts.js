export const forms = document.querySelectorAll('.popup__form')
export const gallery = document.querySelector('.gallery')
export const popupEdit = {
  openBtn: document.querySelector('.profile__edit-button'),
  nameInput: document.querySelector('.popup__input_type_name'),
  descriptionInput: document.querySelector('.popup__input_type_description')
}
export const popupAdd = {
  openBtn: document.querySelector('.profile__add-button')
}
export const formValidationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error',
  minLength: 2
}
export const popupConfig = {
  openedClass: 'popup_opened',
  closeButtonSelector: 'popup__close'
}
export const formValidators = {}