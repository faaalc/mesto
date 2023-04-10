/**
 * The class is responsible for rendering elements on the page.
 * It gets the markup through a callback function and inserts it into a container
 */
class Section {
  /**
   * @param {Object} [options] Options
   * @param {Array} [options.items] Array of data for render
   * @param {Function} [options.renderer] Callback render function
   * @param {HTMLElement} container Container to render items in
   */
  constructor({items, renderer}, container) {
    this._items = items
    this._renderer = renderer
    this._container = container
  }

  /**
   * Activates renderer function, renders data to the passed container
   */
  render = () => {
    this._items.forEach(item => {
      this._renderer(item)
    })
  }
  /**
   * Adds element to the passed container
   * @param {HTMLElement} element
   */
  addItem = element => {
    this._container.prepend(element)
  }

  /**
   * Clears all section
   */
  clearSection = () => {
    this._container.innerHTML = ''
  }
}

export default Section