/**
 * Generates and prepends HTML card element.
 *
 * @param {Object} data Information about the card
 * @param {string} data.name Location
 * @param {string} data.link Image link
 * @param {HTMLElement} selector HTML selector to add the card
 * @param {Function} [imageAction] Optional callback for image actions
 */
const generateAndAddCard = (data, selector, imageAction) => {
  const {name, link} = data,
    card = document.createElement('div')
  card.classList.add('card')

  //Creating card and validating from XSS
  card.innerHTML = `
    <img src=${link.replace(/(<)|(>)/g, '')} alt="${name.replace(/(<)|(>)/g, '')}" class="card__photo">
    <div class="card__description">
      <h2 class="card__location"></h2>
      <button class="button card__like-button" type="button" aria-label="Поставить лайк"></button>
    </div>
    <button class="button card__delete-button" type="button" aria-label="Удалить пост"></button>
  `
  const cardLocation = card.querySelector('.card__location')
  cardLocation.textContent = name

  //Creating functions for listeners
  const likeButton = card.querySelector('.card__like-button'),
    deleteButton = card.querySelector('.card__delete-button'),
    likeCard = () => likeButton.classList.toggle('card__like-button_active'),
    deleteCard = () => deleteButton.closest('.card').remove()

  //Adding listeners
  card.addEventListener('click', e => {
    const checkTarget = (e, className) => e.target.classList.contains(className)
    checkTarget(e, 'card__like-button') && likeCard()
    checkTarget(e, 'card__delete-button') && deleteCard()
    imageAction && checkTarget(e, 'card__photo') && imageAction(e)
  })

  selector.prepend(card)
}

export default generateAndAddCard