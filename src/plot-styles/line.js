import { drawLine } from '../helpers/draw'

const defaultProps = {
  strokeWidth: 1,
  strokeColor: 'blue'
}
/**
 * @desc constructor function, returns the actual function
 * @param {Object} [props]
 * @param {number} [props.strokeWidth=1] Stroke width
 * @param {string} [props.strokeColor='blue'] Line color
 */
function lineStyle (props = {}) {
  let strokeWidth = props.strokeWidth || defaultProps.strokeWidth
  let strokeColor = props.strokeColor || defaultProps.strokeColor
  let marker = props.marker

  let x, y, length
  return (context, options) => {
    context.save()
    context.lineWidth = strokeWidth
    context.strokeStyle = strokeColor
    let xi = x - (options.deltaX || 0)
    if (x && y && xi < options.x) {
      drawLine(context, xi, y - length, options.x, options.y - options.length)
      if (marker) marker(context, options.x, options.y - options.length)
    }
    x = options.x
    y = options.y
    length = options.length
    context.restore()
  }
}

export default lineStyle
