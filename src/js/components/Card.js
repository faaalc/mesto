/** Generates and returns HTML card element */
class Card {
  /**
   * @param {Object} data Information about the card
   * @param {string} data._id Card id
   * @param {string} data.name Location
   * @param {string} data.link Image link
   * @param {Array} data.likes Likes
   * @param {string} data.owner._id Owner id
   * @param {string} userId User id
   * @param {string} templateSelector Card template selector
   * @param {Function} [handleImageClick] Optional callback for image actions
   * @param {Function} handleOpenConfirm Callback to confirm deleting card with api
   * @param {Function} handleLikeCard Callback to like card with api
   */
  constructor({
    data,
    userId,
    templateSelector,
    handleImageClick,
    handleOpenConfirm,
    handleLikeCard
    })
  {
    this.cardId = data._id
    this._userId = userId
    this._ownerId = data.owner._id
    this._name = data.name
    this._src = data.link
    this._likes = data.likes
    this._isLiked = false

    this._templateSelector = templateSelector

    this._handleImageClick = handleImageClick
    this._handleOpenConfirm = handleOpenConfirm
    this._handleLikeCard = handleLikeCard
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
    this._cardLikes = this._element.querySelector('.card__likes')
    this._cardLocation = this._element.querySelector('.card__location')

    this._setListeners()

    this._cardLocation.textContent = this._name
    this._cardLikes.textContent = this._likes.length
    this._cardImage.src = this._src
    this._cardImage.alt = this._name
    if (this._ownerId !== this._userId) {
      this._buttonDelete.classList.add('card__delete-button_hidden')
    }
    this._toggleStateButtonLike()

    return this._element
  }

  toggleLike({ likes }) {
    this._likes = likes
    this._cardLikes.textContent = this._likes.length
    this._toggleStateButtonLike()
  }

  toggleDisableButtonLike(isDisabled) {
    this._buttonLike.disabled = isDisabled
  }

  _toggleStateButtonLike() {
    this._isLiked = this._isLikedByMe()
    this._isLiked
      ? this._buttonLike.classList.add('card__like-button_active')
      : this._buttonLike.classList.remove('card__like-button_active')
  }

  deleteCard() {
    this._element.remove()
    this._element = null
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _isLikedByMe() {
    return this._likes.some(user => user._id === this._userId)
}

  _handleClickButtonLike() {
    this._handleLikeCard(this.cardId, this._isLiked)
  }

  _handleClickButtonDelete() {
    this._handleOpenConfirm(this.cardId)
  }

  _checkTarget = (e, element) => e.target === element

  _setListeners() {
    this._element.addEventListener('click', e => {
      this._checkTarget(e, this._buttonLike) && this._handleClickButtonLike()
      this._checkTarget(e, this._buttonDelete) && this._handleClickButtonDelete()
      this._handleImageClick && this._checkTarget(e, this._cardImage) && this._handleImageClick({
        name: this._name,
        link: this._src
      })
    })
  }
}

export default Card