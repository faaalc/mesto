/**
 * Prepends an element to given selector.
 *
 * @param {HTMLElement} element Element to prepend
 * @param {HTMLElement} selector Selector to prepend in
 */
export const prependElement = (element, selector) => {
  selector.prepend(element)
}