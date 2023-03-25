import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(config, {imageSelector, locationSelector}) {
    super(config);
    this._image = document.querySelector(`.${imageSelector}`)
    this._location = document.querySelector(`.${locationSelector}`)
  }

  open(e) {
    super.open()
    this._image.src = e.target.src
    this._image.alt = e.target.alt
    this._location.textContent = e.target.alt
  }
}

export default PopupWithImage