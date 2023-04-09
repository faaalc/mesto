import Card from "../js/components/Card.js";
import FormValidator from "../js/components/FormValidator.js";
import Section from "../js/components/Section.js";
import PopupWithForm from "../js/components/PopupWithForm.js";
import UserInfo from "../js/components/UserInfo.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import Api from "../js/components/Api";
import {
  popupEditElements,
  popupAddElements,
  popupConfirmElements,
  popupAvatarElements,
  forms,
  formValidators,
  formValidationSettings,
  popupInstances,
  basePopupConfig,
  gallery,
  cardsList,
  BASE_URL,
  TOKEN,
}
  from "../js/consts.js";
import './index.css'

//General functions
const createCard = data => {
  const card = new Card({
    data,
    templateSelector: '#card',
    handleImageClick: (data) => popupImageInstance.open(data),
    handleOpenConfirm: (id) => handleOpenPopupConfirm(id),
    handleLikeCard: (id, isLiked) => handleLikeCard(id, isLiked),
    userId: userInfo.getUserId()
  })
  cardsList.push(card)
  return card.generateCard()
}
const findCard = id => {
  return cardsList.find(card => card.cardId === id)
}
const deleteCardFromArray = id => {
  const index = cardsList.findIndex(card => card.cardId === id)
  cardsList.splice(index, 1)
}

//callbacks
const handleOpenEditPopup = () => {
  popupInstances['edit'].open()
  const {name, about} = userInfo.getUserInfo()
  popupEditElements.nameInput.value = name
  popupEditElements.descriptionInput.value = about

  //checking the validity when opening
  formValidators['edit-description'].forceValidateForm()
}
const handleSubmitPopupEdit = ({name, about}) => {
  popupInstances['edit'].setLoading(true, 'Сохранение...')
  api.updateUserInfo({name, about})
    .then(res => userInfo.setUserInfo(res))
    .catch(console.log)
    .finally(() => {
      popupInstances['edit'].setLoading(false, 'Сохранить')
      popupInstances['edit'].close()
    })
}
const handleSubmitPopupAdd = ({place, link}) => {
  popupInstances['add'].setLoading(true, 'Создание...')
  api.addCard({name: place, link})
    .then(card => {
      cardsSection.addItem(createCard(card))
    })
    .catch(console.log)
    .finally(() => {
      popupInstances['add'].setLoading(false, 'Создать')
      popupInstances['add'].close()
    })
  formValidators['add-card'].disableSubmitButton()
}
const handleSubmitPopupConfirm = ({id}) => {
  popupInstances['confirm'].setLoading(true, 'Удаление...')
  api.deleteCard(id)
    .then(() => {
      const card = findCard(id)
      card.deleteCard()
      deleteCardFromArray(id)
    })
    .catch(console.log)
    .finally(() => {
      popupInstances['confirm'].setLoading(false, 'Да')
      popupInstances['confirm'].close()
    })
}
const handleOpenPopupConfirm = id => {
  popupInstances['confirm'].open()
  popupConfirmElements.idInput.value = id
}
const handleSubmitPopupAvatar = data => {
  popupInstances['avatar'].setLoading(true, 'Сохранение...')
  api.updateAvatar(data)
    .then(res => {
      userInfo.setUserInfo(res)
    })
    .catch(console.log)
    .finally(() => {
      popupInstances['avatar'].setLoading(false, 'Сохранить')
      popupInstances['avatar'].close()
      formValidators['change-avatar'].disableSubmitButton()
    })
}
const handleLikeCard = (id, isLiked) => {
  const card = findCard(id)
  card.toggleButtonLikeState(true)
  api.toggleLike(id, isLiked ? 'DELETE' : 'PUT')
    .then(res => {
      card.updateCard(res)
    })
    .catch(console.log)
    .finally(() => {
      card.toggleButtonLikeState(false)
    })
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, info]) => {
    userInfo.setUserInfo(info)
    cards.reverse().forEach(card => {
      cardsSection.addItem(createCard(card))
    })
  })
  .catch(console.log)

const userInfo = new UserInfo({
  userNameSelector: 'profile__name',
  userInfoSelector: 'profile__description',
  userAvatarSelector: 'profile__avatar'
})

//Creating instance for cards section
const cardsSection = new Section({
  items: [],
  renderer: (data) => {
    cardsSection.addItem(createCard(data))
  }
}, gallery)


//Popups instances
const popupsWithForm = [
  {
    name: 'edit',
    selector: 'popup_type_edit',
    callback: handleSubmitPopupEdit
  },
  {
    name: 'add',
    selector: 'popup_type_add',
    callback: handleSubmitPopupAdd
  },
  {
    name: 'confirm',
    selector: 'popup_type_confirm-delete',
    callback: handleSubmitPopupConfirm
  },
  {
    name: 'avatar',
    selector: 'popup_type_avatar',
    callback: handleSubmitPopupAvatar
  },
]
const createPopupWithFormInstances = popups => {
  popups.forEach(popup => {
    const instance = new PopupWithForm({
      baseConfig: {
        ...basePopupConfig,
        popupSelector: popup.selector
      },
      handleSubmit: popup.callback
    })
    instance.activateListeners()
    popupInstances[popup.name] = instance
  })
}
createPopupWithFormInstances(popupsWithForm)

const popupImageInstance = new PopupWithImage({
  baseConfig: {
    ...basePopupConfig,
    popupSelector: 'popup_type_image'
  },
  imageSelector: 'popup__full-screen-image',
  locationSelector: 'popup__location'
})
popupImageInstance.activateListeners()


popupEditElements.openBtn.addEventListener('click', handleOpenEditPopup)
popupAddElements.openBtn.addEventListener('click', () => popupInstances['add'].open())
popupAvatarElements.openBtn.addEventListener('click', () => popupInstances['avatar'].open())


//Adding validation listeners on every form
const enableValidation = settings => {
  forms.forEach(form => {
    const validator = new FormValidator(settings, form)
    const formName = form.getAttribute('name')
    formValidators[formName] = validator
    validator.enableValidation()
  })
}
enableValidation(formValidationSettings)