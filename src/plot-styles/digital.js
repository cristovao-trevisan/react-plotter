import { drawVerticalLine } from '../helpers/draw'
import circleMarker from '../markers/circle'

const defaultProps = {
  strokeWidth: 1,
  strokeColor: 'black',
  circleColor: 'blue',
  circleRadius: 2
}

function digitalStyle (props = {}) {
  let strokeWidth = props.strokeWidth || defaultProps.strokeWidth
  let strokeColor = props.strokeColor || defaultProps.strokeColor
  let marker = props.marker || circleMarker({ circleColor: 'blue' })

  return (context, options) => {
    context.save()
    context.lineWidth = strokeWidth
    context.strokeStyle = strokeColor
    drawVerticalLine(context, options.x, options.y, options.length)
    if (marker) marker(context, options.x, options.y - options.length)
    context.restore()
  }
}

export default digitalStyle
