/**
 * @module
 * @param {String} id HTML id
 */
export default function goAnchor (id) {
  const dt = id ? document.getElementById(id).offsetTop : 0
  setTimeout(() => {
    window.scrollTo(0, dt)
  }, 50)
}
