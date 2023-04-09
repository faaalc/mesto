import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  /**
   * @param {Object} baseConfig Required options
   * @param {string} baseConfig.popupSelector Popup selector
   * @param {string} baseConfig.openedClass Opened modifier
   * @param {string} baseConfig.buttonCloseSelector Button close selector
   * @param {string} imageSelector Image selector in popup
   * @param {string} locationSelector Paragraph selector
   */
  constructor({baseConfig, imageSelector, locationSelector}) {
    super(baseConfig);
    this._image = document.querySelector(`.${imageSelector}`)
    this._location = document.querySelector(`.${locationSelector}`)
  }

  /**
   * @param {string} name Image name
   * @param {string} link Image link
   */
  open({name, link}) {
    super.open()
    this._image.src = link
    this._image.alt = name
    this._location.textContent = name
  }

  close() {
    super.close();
    this._image.src = ''
    this._image.alt = ''
    this._location.textContent = ''
  }
}

export default PopupWithImage