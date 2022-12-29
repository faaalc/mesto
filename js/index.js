const popupEdit = {
  popup: document.querySelector('.popup'),
  form: document.querySelector('.popup__form_edit-description'),
  openBtn: document.querySelector('.profile__edit-button'),
  closeBtn: document.querySelector('.popup__close'),
  nameInput: document.querySelector('.popup__input_type_name'),
  descriptionInput: document.querySelector('.popup__input_type_description'),
  profileName: document.querySelector('.profile__name'),
  profileDescription: document.querySelector('.profile__description'),
}
//Действия кнопок
const openPopup = () => {
  popupEdit.popup.classList.add('popup_opened')
  popupEdit.nameInput.value = popupEdit.profileName.textContent
  popupEdit.descriptionInput.value = popupEdit.profileDescription.textContent
}
const closePopup = () => {
  popupEdit.popup.classList.remove('popup_opened')
}
const saveChanges = e => {
  e.preventDefault()
  popupEdit.profileName.textContent = popupEdit.nameInput.value
  popupEdit.profileDescription.textContent = popupEdit.descriptionInput.value
  closePopup()
}

popupEdit.openBtn.addEventListener('click', openPopup)
popupEdit.closeBtn.addEventListener('click', closePopup)
popupEdit.form.addEventListener('submit', saveChanges)