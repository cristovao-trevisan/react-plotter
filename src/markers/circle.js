import { drawCircle } from '../helpers/draw'

const defaultProps = {
  circleColor: 'red',
  circleRadius: 2
}

/**
 * @desc constructor function, returns the actual function
 * @param {Object} [props]
 * @param {number} [props.circleRadius=2] Radius
 * @param {string} [props.circleColor='red'] Circle color
 */
function circleMarker (props = {}) {
  let circleColor = props.circleColor || defaultProps.circleColor
  let circleRadius = props.circleRadius || defaultProps.circleRadius

  return (context, x, y) => {
    context.save()
    context.strokeStyle = circleColor
    drawCircle(context, x, y, circleRadius)
    context.restore()
  }
}

export default circleMarker
