import generateAndAddCard from './modules/card.js';
import {initialCards} from './data.js';

document.addEventListener('DOMContentLoaded', () => {
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
    setTimeout(()=> popup.classList.remove('popup_opened', 'hide'), 200)
    document.removeEventListener('keydown', closePopupOnEscape)
  }
  const closePopupOnEscape = e => {
    if (e.key === 'Escape') {
      const popup = document.querySelector('.popup_opened')
      closePopup(popup)
    }
  }
  const openPopup = popup => {
    popup.classList.add('popup_opened')
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
  }
  const handleChangesEditPopup = e => {
    e.preventDefault()
    popupEdit.profileName.textContent = popupEdit.nameInput.value
    popupEdit.profileDescription.textContent = popupEdit.descriptionInput.value
    closePopup(popupEdit.popup)
  }

  //popupAdd submit with validation
  const handleSubmitPopupAdd = e => {
    e.preventDefault()
    const formData = new FormData(e.target),
      formValues = Object.values(Object.fromEntries(formData))
    if (formValues.every(v => !!v.trim())) {
      const data = {
        name: popupAdd.placeInput.value,
        link: popupAdd.linkInput.value
      }
      closePopup(popupAdd.popup)
      generateAndAddCard(data, gallery, openImagePopup)
      popupAdd.placeInput.value = ''
      popupAdd.linkInput.value = ''
    }
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
  initialCards.forEach(card => generateAndAddCard(card, gallery, openImagePopup))
})