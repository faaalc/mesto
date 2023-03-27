export const forms = document.querySelectorAll('.popup__form')
export const gallery = document.querySelector('.gallery')
export const popupEditElements = {
  openBtn: document.querySelector('.profile__edit-button'),
  nameInput: document.querySelector('.popup__input_type_name'),
  descriptionInput: document.querySelector('.popup__input_type_description')
}
export const popupAddElements = {
  openBtn: document.querySelector('.profile__add-button')
}
export const formValidationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error'
}
export const basePopupConfig = {
  openedClass: 'popup_opened',
  buttonCloseSelector: 'popup__close'
}
export const formValidators = {}