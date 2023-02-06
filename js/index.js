import generatePopup from './modules/popup.js';
import generateAndAddCard from './modules/card.js';
import {initialCards} from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery'),
    profileOpenButton = document.querySelector('.profile__edit-button'),
    profileAddButton = document.querySelector('.profile__add-button'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description');


//Adding cards from data to page
  (function () {
    initialCards.forEach(card => generateAndAddCard(card, gallery))
  })()


//Creating and configurating edit popup
  const openPopupEdit = () => {
    const popupEdit = generatePopup({
        className: ['popup_type_edit'],
        title: 'Редактировать профиль',
        form: {
          className: ['popup__form_edit-description'],
          name: 'edit-description',
          callback: saveChangesInEditPopup,
          firstInput: {
            className: ['popup__input_type_name'],
            name: 'popup-name',
            type: 'text',
            placeholder: 'Имя'
          },
          secondInput: {
            className: ['popup__input_type_description'],
            name: 'popup-description',
            type: 'text',
            placeholder: 'О себе'
          },
          button: {
            title: 'Сохранить',
            ariaLabel: 'Сохранить изменения'
          }
        }
      }),
      popupEditNameInput = popupEdit.querySelector('.popup__input_type_name'),
      popupEditDescriptionInput = popupEdit.querySelector('.popup__input_type_description');

    //Setting profile info into inputs
    popupEditNameInput.value = profileName.textContent
    popupEditDescriptionInput.value = profileDescription.textContent

    function saveChangesInEditPopup() {
      profileName.textContent = popupEditNameInput.value
      profileDescription.textContent = popupEditDescriptionInput.value
    }
  }
  profileOpenButton.addEventListener('click', openPopupEdit)


// Creating and configurating add post popup
  const openPopupAdd = () => {
    const popupAdd = generatePopup({
        className: ['popup_type_add'],
        title: 'Новое место',
        form: {
          className: ['popup__form_add-card'],
          name: 'add-card',
          callback: addNewCardFromPopup,
          firstInput: {
            className: ['popup__input_type_place'],
            name: 'popup-place',
            type: 'text',
            placeholder: 'Место'
          },
          secondInput: {
            className: ['popup__input_type_link'],
            name: 'popup-link',
            type: 'url',
            placeholder: 'Ссылка на картинку'
          },
          button: {
            title: 'Создать',
            ariaLabel: 'Создать карточку'
          }
        }
      }),
      popupAddPlaceInput = popupAdd.querySelector('.popup__input_type_place'),
      popupAddLinkInput = popupAdd.querySelector('.popup__input_type_link');

    function addNewCardFromPopup() {
      const data = {
        name: popupAddPlaceInput.value,
        link: popupAddLinkInput.value
      }
      generateAndAddCard(data, gallery)
      popupAddPlaceInput.value = ''
      popupAddLinkInput.value = ''
    }
  }
  profileAddButton.addEventListener('click', openPopupAdd)
})