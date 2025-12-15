export const RpgPlace = {
  left: null,
  right: null,
  top: null,
  bottom: null,
  width: null,
  height: null,

  setPlace(place) {
    this.top = place.top
    this.bottom = place.bottom
    this.left = place.left
    this.right = place.right
    this.height = place.height
    this.width = place.width
  },
}
