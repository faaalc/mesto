/** Generates and returns HTML card element */
class Card {
  /**
   * @param {Object} data Information about the card
   * @param {string} data.name Location
   * @param {string} data.link Image link
   * @param {string} templateSelector Card template selector
   * @param {Function} [imageAction] Optional callback for image actions
   */
  constructor(data, templateSelector, imageAction) {
    this._name = data.name
    this._src = data.link
    this._templateSelector = templateSelector
    this._imageAction = imageAction
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle('card__like-button_active')
  }

  _handleDeleteCard() {
    this._element.remove()
  }

  _checkTarget = (e, element) => e.target === element

  _setListeners() {
    this._element.addEventListener('click', e => {
      this._checkTarget(e, this._likeButton) && this._handleLikeCard()
      this._checkTarget(e, this._deleteButton) && this._handleDeleteCard()
      this._imageAction && this._checkTarget(e, this._cardImage) && this._imageAction(e)
    })
  }

  /**
   * Generates and returns HTML card element
   * @returns {HTMLElement} HTML Card Element
   */
  generateCard() {
    this._element = this._getTemplate()
    this._likeButton = this._element.querySelector('.card__like-button')
    this._deleteButton = this._element.querySelector('.card__delete-button')
    this._cardImage = this._element.querySelector('.card__photo')
    const cardLocation = this._element.querySelector('.card__location')

    this._setListeners()

    cardLocation.textContent = this._name
    this._cardImage.src = this._src
    this._cardImage.alt = this._name

    return this._element
  }
}

export default Card