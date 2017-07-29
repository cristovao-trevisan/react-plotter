import { drawCircle, drawVerticalLine } from '../helpers/draw'

const defaultProps = {
  strokeWidth: 1,
  strokeColor: 'black',
  circleColor: 'blue',
  circleRadius: 2
}
/**
 * @desc constructor function, returns the actual function
 * @param {Object} [props]
 * @param {number} [props.strokeWidth=1] Stroke width
 * @param {string} [props.strokeColor='black'] Line color
 * @param {string} [props.circleColor='blue'] Circle (at top) color
 * @param {number} [props.circleRadius=2] Circle (at top) radius
 */
function digitalStyle (props = {}) {
  let strokeWidth = props.strokeWidth || defaultProps.strokeWidth
  let strokeColor = props.strokeColor || defaultProps.strokeColor
  let circleColor = props.circleColor || defaultProps.circleColor
  let circleRadius = props.circleRadius || defaultProps.circleRadius

  /**
   * @desc drawing function
   * @param {Object} context Canvas 2d context
   * @param {number} options.x Initial x
   * @param {number} options.y Initial y
   * @param {number} options.length Length
   */
  return (context, options) => {
    context.save()
    context.lineWidth = strokeWidth
    context.strokeStyle = strokeColor
    drawVerticalLine(context, options.x, options.y, options.length)
    context.strokeStyle = circleColor
    drawCircle(context, options.x, options.y - options.length, circleRadius)
    context.restore()
  }
}

export default digitalStyle
