//Popup functions
const closePopup = (popup) => popup.classList.remove('popup_opened')
const openPopup = (popup) => popup.classList.add('popup_opened')
/**
 * Generates HTML popup element.
 *
 * @param {Object} settings Settings
 * @param {string[]} settings.className Popup classes
 * @param {string} settings.title Popup title
 * @param {Object} settings.form /////Popup form/////
 * @param {string[]} settings.form.className Popup form classes
 * @param {string} settings.form.name Popup name
 * @param {function} settings.form.callback Popup submit function
 * @param {Object} settings.firstInput /////Popup 1st input/////
 * @param {string[]} settings.firstInput.className Input classes
 * @param {string} settings.firstInput.name Input name
 * @param {string} settings.firstInput.type Input type
 * @param {string} settings.firstInput.placeholder Input placeholder
 * @param {Object} settings.secondInput /////Popup 2nd input/////
 * @param {string[]} settings.secondInput.className Input classes
 * @param {string} settings.secondInput.name Input name
 * @param {string} settings.secondInput.type Input type
 * @param {string} settings.secondInput.placeholder Input placeholder
 * @param {Object} settings.button /////Popup save button/////
 * @param {string} settings.button.title Button title
 * @param {string} settings.button.ariaLabel Button aria-label
 * @return {HTMLElement} HTML popup element.
 */
const generatePopup = (settings) => {
  const {className, title, form, firstInput, secondInput, button} = settings,
    popup = document.createElement('div')
  popup.classList.add('popup', className.join((' ')))

  popup.innerHTML = `
    <div class="popup__container">
      <h2 class="popup__title">${title}</h2>
      <form method="post" action="#" name="${form.name}" class="popup__form ${form.className.join(' ')}">
        <input required 
          type="${firstInput.type}" 
          class="popup__input ${firstInput.className.join(' ')}" 
          name="${firstInput.name}" 
          placeholder="${firstInput.placeholder}">
        <input required 
          type="${secondInput.type}" 
          class="popup__input ${secondInput.className.join(' ')}" 
          name="${secondInput.name}" 
          placeholder="${secondInput.placeholder}">
        <button class="button popup__save" type="submit" aria-label="${button.ariaLabel}">${button.title}</button>
      </form>
      <button class="button popup__close" type="button" aria-label="Закрыть модальное окно"></button>
    </div>
  `

  //adding listeners
  const popupButtonClose = popup.querySelector('.popup__close'),
    popupForm = popup.querySelector('.popup__form')

  popupButtonClose.addEventListener('click', () => closePopup(popup))
  popupForm.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(e.target),
          formValues = Object.values(Object.fromEntries(formData))
    if (formValues.every(v => !!v.trim())) {
      form.callback()
      closePopup(popup)
    }
  })

  document.body.append(popup)
  return popup
}


//Gallery
const GALLERY = document.querySelector('.gallery')
/**
 * Generates and prepends HTML card element.
 *
 * @param {Object} data Information about the card
 * @param {string} data.name Location
 * @param {string} data.link Image link
 * @param {HTMLElement} selector HTML selector to add the card
 */
const generateAndAddCard = (data, selector) => {
  const {name, link} = data,
    card = document.createElement('div')
  card.classList.add('card')

  card.innerHTML = `
    <img src=${link} alt="${name}" class="card__photo">
    <div class="card__description">
      <h2 class="card__location">${name}</h2>
      <button class="button card__like-button" type="button" aria-label="Поставить лайк"></button>
    </div>
    <button class="button card__delete-button" type="button" aria-label="Удалить пост"></button>
  `

  //adding listeners
  const likeButton = card.querySelector('.card__like-button'),
    deleteButton = card.querySelector('.card__delete-button'),
    likeCard = () => likeButton.classList.toggle('card__like-button_active'),
    deleteCard = () => deleteButton.closest('.card').remove(),
    openCard = e => {
      const image = e.target.src,
        location = e.target.alt,
        popup = document.createElement('div')
      popup.classList.add('popup', 'popup-image', 'popup_opened')

      popup.innerHTML = `
            <div class="popup-image__container">
              <img class="popup-image__image" src="${image}" alt="${image}">
              <p class="popup-image__location">${location}</p>
              <button class="button popup__close" type="button" aria-label="Закрыть модальное окно"></button>
            </div>
          `

      const popupButtonClose = popup.querySelector('.popup__close')
      popupButtonClose.addEventListener('click', e => {
        e.target.closest('.popup').remove()
      })
      document.body.append(popup)
    }

  card.addEventListener('click', e => {
    const checkTarget = (e, className) => e.target.classList.contains(className)
    checkTarget(e, 'card__like-button') && likeCard()
    checkTarget(e, 'card__delete-button') && deleteCard()
    checkTarget(e, 'card__photo') && openCard(e)
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

function saveChangesInEditPopup() {
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
  }),
  popupAddPlaceInput = popupAdd.querySelector('.popup__input_type_place'),
  popupAddLinkInput = popupAdd.querySelector('.popup__input_type_link'),
  profileAddButton = document.querySelector('.profile__add-button')


function addNewCardFromPopup() {
  const data = {
    name: popupAddPlaceInput.value,
    link: popupAddLinkInput.value
  }
  generateAndAddCard(data, GALLERY)
  popupAddPlaceInput.value = ''
  popupAddLinkInput.value = ''
}

profileAddButton.addEventListener('click', () => openPopup(popupAdd))