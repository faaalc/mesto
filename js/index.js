const popupEdit = {
  root: document.querySelector('.root'),
  popup: document.querySelector('.popup'),
  openBtn: document.querySelector('.profile__edit-button'),
  closeBtn: document.querySelector('.popup__close'),
  saveBtn: document.querySelector('.popup__save'),
  nameInput: document.querySelector('input[name="popup-name"]'),
  descriptionInput: document.querySelector('input[name="popup-description"]'),
  profileName: document.querySelector('.profile__name'),
  profileDescription: document.querySelector('.profile__description'),
}

const open = () => {
  popupEdit.popup.classList.add('popup_opened')
  popupEdit.root.style.overflow = 'hidden'
  popupEdit.nameInput.value = popupEdit.profileName.textContent
  popupEdit.descriptionInput.value = popupEdit.profileDescription.textContent
}
const close = e => {
  e.preventDefault()
  popupEdit.popup.classList.remove('popup_opened')
  popupEdit.root.style.overflow = 'auto'
}
const save = e => {
  e.preventDefault()
  popupEdit.profileName.textContent = popupEdit.nameInput.value
  popupEdit.profileDescription.textContent = popupEdit.descriptionInput.value
  popupEdit.popup.classList.remove('popup_opened')
  popupEdit.root.style.overflow = 'auto'
}

popupEdit.openBtn.addEventListener('click', open)
popupEdit.closeBtn.addEventListener('click', close)
popupEdit.saveBtn.addEventListener('click', save)