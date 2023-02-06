/**
 * Generates HTML popup element.
 *
 * @param {Object} settings Settings
 * @param {string[]} settings.className Popup classes
 * @param {string} [settings.title] Popup title
 * @param {Object} [settings.form] /////Popup form/////
 * @param {string[]} settings.form.className Popup form classes
 * @param {string} settings.form.name Popup name
 * @param {function} settings.form.callback Popup submit function
 * @param {Object} settings.form.firstInput /////Popup 1st input/////
 * @param {string[]} settings.form.firstInput.className Input classes
 * @param {string} settings.form.firstInput.name Input name
 * @param {string} settings.form.firstInput.type Input type
 * @param {string} settings.form.firstInput.placeholder Input placeholder
 * @param {Object} [settings.form.secondInput] /////Popup 2nd input/////
 * @param {string[]} settings.form.secondInput.className Input classes
 * @param {string} settings.form.secondInput.name Input name
 * @param {string} settings.form.secondInput.type Input type
 * @param {string} settings.form.secondInput.placeholder Input placeholder
 * @param {Object} settings.form.button /////Popup save button/////
 * @param {string} settings.form.button.title Button title
 * @param {string} settings.form.button.ariaLabel Button aria-label
 * @param {Object} [settings.image] /////Popup for images/////
 * @param {string} settings.image.img Image link
 * @param {string} settings.image.location Image location
 * @return {HTMLElement} HTML popup element.
 */
const generatePopup = (settings) => {
  const {className, title, form, image} = settings,
    popup = document.createElement('div'),
    container = document.createElement('div'),
    closeButtonHTML = `<button class="button popup__close" type="button" aria-label="Закрыть модальное окно"></button>`


  popup.classList.add('popup', ...className)
  container.classList.add('popup__container')
  container.insertAdjacentHTML('beforeend', closeButtonHTML)

  //Optional title
  if (title) {
    const titleHTML = `<h2 class="popup__title">${title}</h2>`
    container.insertAdjacentHTML('beforeend', titleHTML)
  }

  //Optional form
  if (form) {
    const {firstInput, secondInput, button} = form
    const formHTML = `<form method="post" action="#" 
            name="${form.name}" 
            class="popup__form ${form.className.join(' ')}"></form>`
    container.insertAdjacentHTML('beforeend', formHTML)
    const formEl = container.querySelector('form')

    //Required input
    const firstInputHTML = `<input required
          type="${firstInput.type}"
          class="popup__input ${firstInput.className.join(' ')}"
          name="${firstInput.name}"
          placeholder="${firstInput.placeholder}">`
    formEl.insertAdjacentHTML('beforeend', firstInputHTML)

    // Optional input
    if (secondInput) {
      const secondInputHTML = `<input required
            type="${secondInput.type}"
            class="popup__input ${secondInput.className.join(' ')}"
            name="${secondInput.name}"
            placeholder="${secondInput.placeholder}">`
      formEl.insertAdjacentHTML('beforeend', secondInputHTML)
    }

    // Required button
    const buttonHTML = `<button 
          class="button popup__save" 
          type="submit" 
          aria-label="${button.ariaLabel}">${button.title}</button>`
    formEl.insertAdjacentHTML('beforeend', buttonHTML)
  }

  //Optional (image popup)
  if (image) {
    const {img, location} = image
    container.classList.add('popup__container_image')
    const html = `<img class="popup__full-screen-image" src="${img}" alt="${location}">
                  <p class="popup__location">${location}</p>`
    container.insertAdjacentHTML('beforeend', html)
  }


  //Closing and removing listeners function
  const closePopup = () => {
    popup.classList.add('hide')
    setTimeout(() => popup.remove(), 300)
    document.removeEventListener('keydown', closeOnEscape)
    closeButtonEl.removeEventListener('click', closePopup)
    formEl?.removeEventListener('submit', formCallback)
  }

  //Adding form submit listener and validating form
  const formCallback = e => {
    e.preventDefault()
    const formData = new FormData(e.target),
      formValues = Object.values(Object.fromEntries(formData))
    if (formValues.every(v => !!v.trim())) {
      form.callback()
      closePopup()
    }
  }
  const formEl = container.querySelector('form')
  formEl?.addEventListener('submit', formCallback)

  //Close actions
  const closeOnEscape = e => e.key === 'Escape' && closePopup(),
    closeButtonEl = container.querySelector('.popup__close');
  document.addEventListener('keydown', closeOnEscape)
  closeButtonEl.addEventListener('click', closePopup)

  popup.append(container)
  document.body.append(popup)
  return popup
}

export default generatePopup