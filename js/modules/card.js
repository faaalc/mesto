/**
 * Generates and prepends HTML card element.
 *
 * @param {Object} data Information about the card
 * @param {string} data.name Location
 * @param {string} data.link Image link
 * @param {HTMLElement} selector HTML selector to add the card
 * @param {Function} [imageAction] Optional callback for image actions
 */
const generateCard = (data, selector, imageAction) => {
  const
    {name, link} = data,
    cardTemplate = document.querySelector('#card').content,
    cardElement = cardTemplate.querySelector('.card').cloneNode(true),
    likeButton = cardElement.querySelector('.card__like-button'),
    deleteButton = cardElement.querySelector('.card__delete-button'),
    cardImage = cardElement.querySelector('.card__photo'),
    cardLocation = cardElement.querySelector('.card__location')

  cardLocation.textContent = name
  cardImage.src = link
  cardImage.alt = name

  //Creating functions for listeners
  const
    likeCard = () => likeButton.classList.toggle('card__like-button_active'),
    deleteCard = () => deleteButton.closest('.card').remove(),
    checkTarget = (e, className) => e.target.classList.contains(className);

  //Adding listeners
  cardElement.addEventListener('click', e => {
    checkTarget(e, 'card__like-button') && likeCard()
    checkTarget(e, 'card__delete-button') && deleteCard()
    imageAction && checkTarget(e, 'card__photo') && imageAction(e)
  })

  prependCard(cardElement, selector)
}
const prependCard = (card, selector) => {
  selector.prepend(card)
}
export default generateCard