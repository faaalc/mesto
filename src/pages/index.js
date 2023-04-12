import Card from "../js/components/Card.js";
import ErrorBlock from "../js/components/ErrorBlock";
import Section from "../js/components/Section.js";
import UserInfo from "../js/components/UserInfo.js";
import FormValidator from "../js/components/FormValidator.js";
import PopupWithForm from "../js/components/PopupWithForm.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import PopupWithConfirm from "../js/components/PopupWithConfirm";
import Api from "../js/components/Api";
import {
  popupEditElements,
  popupAddElements,
  popupAvatarElements,
  forms,
  formValidators,
  formValidationSettings,
  popupWithFormInstances,
  basePopupConfig,
  gallery,
  main,
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
    handleOpenConfirm: (id) => popupWithConfirm.open(id, card),
    handleLikeCard: (id, isLiked) => handleToggleLike(id, isLiked, card),
    userId: userInfo.getUserId()
  })
  return card.generateCard()
}
const createErrorBlock = text => {
  const errorBlock = new ErrorBlock({
    text,
    templateSelector: '#error-block'
  })
  return errorBlock.generateBlock()
}

//Callbacks
const handleOpenPopupEdit = () => {
  popupWithFormInstances['edit'].open()
  const {name, about} = userInfo.getUserInfo()
  popupEditElements.nameInput.value = name
  popupEditElements.descriptionInput.value = about

  //checking the validity when opening
  formValidators['edit-description'].forceValidateForm()
}
const handleOpenPopupAdd = () => {
  popupWithFormInstances['add'].open()
  formValidators['add-card'].disableSubmitButton()
}
const handleOpenPopupAvatar = () => {
  popupWithFormInstances['avatar'].open()
  formValidators['change-avatar'].disableSubmitButton()
}
const handleSubmitPopupEdit = ({name, about}) => {
  popupWithFormInstances['edit'].setLoading(true, 'Сохранение...')
  api.updateUserInfo({name, about})
    .then(res => {
      userInfo.setUserInfo(res)
      popupWithFormInstances['edit'].close()
    })
    .catch(console.log)
    .finally(() => {
      popupWithFormInstances['edit'].setLoading(false, 'Сохранить')
    })
}
const handleSubmitPopupAdd = ({place, link}) => {
  popupWithFormInstances['add'].setLoading(true, 'Создание...')
  api.addCard({name: place, link})
    .then(card => {
      cardsSection.addItem(createCard(card))
      popupWithFormInstances['add'].close()
    })
    .catch(console.log)
    .finally(() => {
      popupWithFormInstances['add'].setLoading(false, 'Создать')
    })
}
const handleSubmitPopupConfirm = (id, card) => {
  popupWithConfirm.setLoading(true, 'Удаление...')
  api.deleteCard(id)
    .then(() => {
      card.deleteCard()
      popupWithConfirm.close()
    })
    .catch(console.log)
    .finally(() => {
      popupWithConfirm.setLoading(false, 'Да')
    })
}
const handleSubmitPopupAvatar = data => {
  popupWithFormInstances['avatar'].setLoading(true, 'Сохранение...')
  api.updateAvatar(data)
    .then(res => {
      userInfo.setUserInfo(res)
      popupWithFormInstances['avatar'].close()
    })
    .catch(console.log)
    .finally(() => {
      popupWithFormInstances['avatar'].setLoading(false, 'Сохранить')
    })
}
const handleToggleLike = (id, isLiked, card) => {
  card.toggleDisableButtonLike(true)
  api.toggleLike(id, isLiked ? 'DELETE' : 'PUT')
    .then(res => {
      card.toggleLike(res)
    })
    .catch(console.log)
    .finally(() => {
      card.toggleDisableButtonLike(false)
    })
}

//Instances
const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, {name, about, avatar, _id}]) => {
    userInfo.setUserInfo({name, about, avatar, _id})
    cardsSection.render(cards.reverse())
  })
  .catch(e => {
    mainSection.clearSection()
    mainSection.addItem(createErrorBlock(`Не удалось загрузить приложение\n${e}`))
  })

const userInfo = new UserInfo({
  userNameSelector: 'profile__name',
  userInfoSelector: 'profile__description',
  userAvatarSelector: 'profile__avatar'
})

//Creating instance for cards section
const cardsSection = new Section({
  renderer: (data) => {
    cardsSection.addItem(createCard(data))
  }
}, gallery)
const mainSection = new Section({}, main)


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
    popupWithFormInstances[popup.name] = instance
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

const popupWithConfirm = new PopupWithConfirm({
  baseConfig: {
    ...basePopupConfig,
    popupSelector: 'popup_type_confirm-delete'
  },
  handleSubmit: handleSubmitPopupConfirm
})
popupWithConfirm.activateListeners()


popupEditElements.openBtn.addEventListener('click', handleOpenPopupEdit)
popupAddElements.openBtn.addEventListener('click', handleOpenPopupAdd)
popupAvatarElements.openBtn.addEventListener('click', handleOpenPopupAvatar)


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