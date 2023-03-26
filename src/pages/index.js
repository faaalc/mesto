import Card from "../js/components/Card.js";
import FormValidator from "../js/components/FormValidator.js";
import Section from "../js/components/Section.js";
import PopupWithForm from "../js/components/PopupWithForm.js";
import UserInfo from "../js/components/UserInfo.js";
import PopupWithImage from "../js/components/PopupWithImage.js";
import {initialCards} from '../js/data.js';
import {
  popupEdit,
  popupAdd,
  forms,
  formValidators,
  formValidationSettings,
  popupConfig,
  gallery
}
  from "../js/consts.js";
import './index.css'


//General functions
const createCard = data => {
  const card = new Card(data, '#card', (e) => imagePopup.open(e))
  return card.generateCard()
}


//callbacks
const openEditPopup = () => {
  editPopup.open()
  const {name, info} = userInfo.getUserInfo()
  popupEdit.nameInput.value = name
  popupEdit.descriptionInput.value = info

  //checking the validity when opening
  formValidators['edit-description'].validateFormOnOpen()
}
const handleSubmitPopupEdit = ({name, description}) => {
  editPopup.close()
  userInfo.setUserInfo({name: name.trim(), info: description.trim()})
}
const handleSubmitPopupAdd = ({place, link}) => {
  addPopup.close()
  cardList.addItem(createCard({link, name: place}))
  formValidators['add-card'].resetForm()
}


const userInfo = new UserInfo({
  userNameSelector: 'profile__name',
  userInfoSelector: 'profile__description'
})

//Adding cards to page form data
const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    cardList.addItem(createCard(data))
  }
}, gallery)
cardList.render()


//Popups instances
const editPopup = new PopupWithForm({
  initialConfig: {
    ...popupConfig,
    popupSelector: 'popup_type_edit',
  },
  handleSubmit: handleSubmitPopupEdit,
  formSelector: 'popup__form_edit-description'
})

const addPopup = new PopupWithForm({
  initialConfig: {
    ...popupConfig,
    popupSelector: 'popup_type_add'
  },
  handleSubmit: handleSubmitPopupAdd,
  formSelector: 'popup__form_add-card'
})

const imagePopup = new PopupWithImage({
  initialConfig: {
    ...popupConfig,
    popupSelector: 'popup_type_image'
  },
  imageSelector: 'popup__full-screen-image',
  locationSelector: 'popup__location'
})

addPopup.activateListeners()
editPopup.activateListeners()
imagePopup.activateListeners()


popupEdit.openBtn.addEventListener('click', openEditPopup)
popupAdd.openBtn.addEventListener('click', () => addPopup.open())


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