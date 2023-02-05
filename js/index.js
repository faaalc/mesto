//Popup generate function
const generatePopup = (settings) => {
  const {className, title, form, firstInput, secondInput, button} = settings,
    popup = document.createElement('div')
    popup.classList.add('popup', className.join((' ')))

  popup.innerHTML = `
    <div class="popup__container">
      <h2 class="popup__title">${title}</h2>
      <form method="post" action="#" name="${form.name}" class="popup__form ${form.className.join(' ')}">
        <input type="text" 
          class="popup__input ${firstInput.className.join(' ')}" 
          name="${firstInput.name}" 
          placeholder="${firstInput.placeholder}">
        <input type="text" 
          class="popup__input ${secondInput.className.join(' ')}" 
          name="${secondInput.name}" 
          placeholder="${secondInput.placeholder}">
        <button class="button popup__save" type="submit" aria-label="${button.ariaLabel}">${button.title}</button>
      </form>
      <button class="button popup__close" type="button" aria-label="Закрыть модальное окно"></button>
    </div>
  `

  const popupButtonClose = popup.querySelector('.popup__close'),
        popupForm = popup.querySelector('.popup__form'),
        closePopup = () => popup.classList.remove('popup_opened')

  popupButtonClose.addEventListener('click', closePopup)
  popupForm.addEventListener('submit', e => {
    form.callback(e)
    closePopup()
  })

  document.body.append(popup)
  return popup
}
const openPopup = (popup) => popup.classList.add('popup_opened')


//Gallery
const GALLERY = document.querySelector('.gallery')

/**
 * Generates HTML card element.
 *
 * @param data Information about the card
 * @param data.name Location
 * @param data.link Image link
 * @param selector HTML selector to add the card
 * @return {Element} HTML card element.
 */
const generateAndAddCard = (data, selector) => {
  const {name, link} = data,
    card = document.createElement('div')
    card.classList.add('card')

  card.innerHTML = `
    <img src=${link} alt="Фото ${name}" class="card__photo">
    <div class="card__description">
      <h2 class="card__location">${name}</h2>
      <button class="button card__like-button" type="button" aria-label="Поставить лайк"></button>
    </div>
    <button class="button card__delete-button" type="button" aria-label="Удалить пост"></button>
  `

  const likeButton = card.querySelector('.card__like-button'),
        deleteButton = card.querySelector('.card__delete-button'),
        likeCard = () => likeButton.classList.toggle('card__like-button_active'),
        deleteCard = () => deleteButton.closest('.card').remove()

  card.addEventListener('click', e => {
    e.target.classList.contains('card__like-button') && likeCard()
    e.target.classList.contains('card__delete-button') && deleteCard()
  })


  selector.prepend(card)
}

const addCardsToGallery = (cards, selector) => {
  cards.forEach(card => generateAndAddCard(card, selector))
}
addCardsToGallery(initialCards, GALLERY)


//Creating and configurating edit popup
const popupEdit = generatePopup({
    className: ['popup_type_edit'],
    title: 'Редактировать профиль',
    form: {
      className: ['popup__form_edit-description'],
      name: 'edit-description',
      callback: saveChangesInEditPopup
    },
    firstInput: {
      className: ['popup__input_type_name'],
      name: 'popup-name',
      placeholder: 'Имя'
    },
    secondInput: {
      className: ['popup__input_type_description'],
      name: 'popup-description',
      placeholder: 'О себе'
    },
    button: {
      title: 'Сохранить',
      ariaLabel: 'Сохранить изменения'
    }
  }),
  popupEditNameInput = popupEdit.querySelector('.popup__input_type_name'),
  popupEditDescriptionInput = popupEdit.querySelector('.popup__input_type_description'),
  profileName = document.querySelector('.profile__name'),
  profileDescription = document.querySelector('.profile__description'),
  profileOpenButton = document.querySelector('.profile__edit-button')

const openEditPopup = () => {
  openPopup(popupEdit)
  popupEditNameInput.value = profileName.textContent
  popupEditDescriptionInput.value = profileDescription.textContent
}
function saveChangesInEditPopup(e) {
  e.preventDefault()
  profileName.textContent = popupEditNameInput.value
  profileDescription.textContent = popupEditDescriptionInput.value
}
profileOpenButton.addEventListener('click', openEditPopup)


//Creating and configurating add post popup
const popupAdd = generatePopup({
  className: ['popup_type_add'],
  title: 'Новое место',
  form: {
    className: ['popup__form_add-card'],
    name: 'add-card',
    callback: addNewCardFromPopup
  },
  firstInput: {
    className: ['popup__input_type_place'],
    name: 'popup-place',
    placeholder: 'Место'
  },
  secondInput: {
    className: ['popup__input_type_link'],
    name: 'popup-link',
    placeholder: 'Ссылка на картинку'
  },
  button: {
    title: 'Создать',
    ariaLabel: 'Создать карточку'
  }
}),
  popupAddPlaceInput = popupAdd.querySelector('.popup__input_type_place'),
  popupAddLinkInput = popupAdd.querySelector('.popup__input_type_link'),
  profileAddButton = document.querySelector('.profile__add-button')


function addNewCardFromPopup(e) {
  e.preventDefault()
  const data = {
    name: popupAddPlaceInput.value,
    link: popupAddLinkInput.value
  }
  generateAndAddCard(data, GALLERY)
  popupAddPlaceInput.value = ''
  popupAddLinkInput.value = ''
}
profileAddButton.addEventListener('click', () => openPopup(popupAdd))