import Card from "../js/components/Card.js";
import FormValidator from "../js/components/FormValidator.js";
import Section from "../js/components/Section.js";
import PopupWithForm from "../js/components/PopupWithForm.js";
import UserInfo from "../js/components/UserInfo.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import {initialCards} from '../js/data.js';
import {
  popupEditElements,
  popupAddElements,
  forms,
  formValidators,
  formValidationSettings,
  basePopupConfig,
  gallery
}
  from "../js/consts.js";
import './index.css'


//General functions
const createCard = data => {
  const card = new Card(data, '#card', (e) => handleOpenPopupImage(e))
  return card.generateCard()
}


//callbacks
const openEditPopup = () => {
  popupEditInstance.open()
  const {name, info} = userInfo.getUserInfo()
  popupEditElements.nameInput.value = name
  popupEditElements.descriptionInput.value = info

  //checking the validity when opening
  formValidators['edit-description'].forceValidateForm()
}
const handleSubmitPopupEdit = ({name, description}) => {
  popupEditInstance.close()
  userInfo.setUserInfo({name: name.trim(), info: description.trim()})
}
const handleSubmitPopupAdd = ({place, link}) => {
  popupAddInstance.close()
  cardsSection.addItem(createCard({link, name: place}))
  formValidators['add-card'].disableSubmitButton()
}
const handleOpenPopupImage = e => {
  const data = {
    name: e.target.alt,
    link: e.target.src
  }
  popupImageInstance.open(data)
}


const userInfo = new UserInfo({
  userNameSelector: 'profile__name',
  userInfoSelector: 'profile__description'
})

//Adding cards to page form data
const cardsSection = new Section({
  items: initialCards,
  renderer: (data) => {
    cardsSection.addItem(createCard(data))
  }
}, gallery)
cardsSection.render()


//Popups instances
const popupEditInstance = new PopupWithForm({
  baseConfig: {
    ...basePopupConfig,
    popupSelector: 'popup_type_edit',
  },
  handleSubmit: handleSubmitPopupEdit,
  formSelector: 'popup__form_edit-description'
})

const popupAddInstance = new PopupWithForm({
  baseConfig: {
    ...basePopupConfig,
    popupSelector: 'popup_type_add'
  },
  handleSubmit: handleSubmitPopupAdd,
  formSelector: 'popup__form_add-card'
})

const popupImageInstance = new PopupWithImage({
  baseConfig: {
    ...basePopupConfig,
    popupSelector: 'popup_type_image'
  },
  imageSelector: 'popup__full-screen-image',
  locationSelector: 'popup__location'
})

popupAddInstance.activateListeners()
popupEditInstance.activateListeners()
popupImageInstance.activateListeners()


popupEditElements.openBtn.addEventListener('click', openEditPopup)
popupAddElements.openBtn.addEventListener('click', () => popupAddInstance.open())


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