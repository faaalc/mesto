const cardTemplate = document.querySelector('#card').content

/**
 * Generates and returns HTML card element.
 *
 * @param {Object} data Information about the card
 * @param {string} data.name Location
 * @param {string} data.link Image link
 * @param {Function} [imageAction] Optional callback for image actions
 * @returns {HTMLElement} HTML Card Element
 */
const generateCard = (data, imageAction) => {
  const
    {name, link} = data,
    cardElement = cardTemplate.querySelector('.card').cloneNode(true),
    likeButton = cardElement.querySelector('.card__like-button'),
    cardImage = cardElement.querySelector('.card__photo'),
    cardLocation = cardElement.querySelector('.card__location')

  cardLocation.textContent = name
  cardImage.src = link
  cardImage.alt = name

  //Creating functions for listeners
  const
    likeCard = () => likeButton.classList.toggle('card__like-button_active'),
    deleteCard = () => cardElement.remove(),
    checkTarget = (e, className) => e.target.classList.contains(className);

  //Adding listeners
  cardElement.addEventListener('click', e => {
    checkTarget(e, 'card__like-button') && likeCard()
    checkTarget(e, 'card__delete-button') && deleteCard()
    imageAction && checkTarget(e, 'card__photo') && imageAction(e)
  })

  return cardElement
}
export default generateCard