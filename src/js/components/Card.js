/** Generates and returns HTML card element */
class Card {
  /**
   * @param {Object} data Information about the card
   * @param {string} data.name Location
   * @param {string} data.link Image link
   * @param {string} templateSelector Card template selector
   * @param {Function} [handleImageClick] Optional callback for image actions
   */
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name
    this._src = data.link
    this._templateSelector = templateSelector
    this._handleImageClick = handleImageClick
  }

  /**
   * Generates and returns HTML card element
   * @returns {HTMLElement} HTML Card Element
   */
  generateCard() {
    this._element = this._getTemplate()
    this._buttonLike = this._element.querySelector('.card__like-button')
    this._buttonDelete = this._element.querySelector('.card__delete-button')
    this._cardImage = this._element.querySelector('.card__photo')
    const cardLocation = this._element.querySelector('.card__location')

    this._setListeners()

    cardLocation.textContent = this._name
    this._cardImage.src = this._src
    this._cardImage.alt = this._name

    return this._element
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _handleLikeCard() {
    this._buttonLike.classList.toggle('card__like-button_active')
  }

  _handleDeleteCard() {
    this._element.remove()
    this._element = null
  }

  _checkTarget = (e, element) => e.target === element

  _setListeners() {
    this._element.addEventListener('click', e => {
      this._checkTarget(e, this._buttonLike) && this._handleLikeCard()
      this._checkTarget(e, this._buttonDelete) && this._handleDeleteCard()
      this._handleImageClick && this._checkTarget(e, this._cardImage) && this._handleImageClick(e)
    })
  }
}

export default Card