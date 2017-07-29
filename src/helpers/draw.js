export const drawCircle = (context, xc, yc, radius) => {
  context.beginPath()
  context.arc(xc, yc, radius, 0, 2 * Math.PI)
  context.stroke()
}

export const drawVerticalLine = (context, x, y, length) => {
  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(x, y - length)
  context.stroke()
}

export const drawLine = (context, xi, yi, xf, yf) => {
  context.beginPath()
  context.moveTo(xi, yi)
  context.lineTo(xf, yf)
  context.stroke()
}

export const drawArrow = (context, x, y, length, arrowSize, vertical, inverted) => {
  let arrowWidth = arrowSize / 4
  context.beginPath()
  context.moveTo(x, y)
  if (vertical) {
    if (inverted) {
      context.lineTo(x + arrowWidth, y - arrowSize)
      context.moveTo(x, y)
      context.lineTo(x - arrowWidth, y - arrowSize)
      context.moveTo(x, y)
      context.lineTo(x, y - length)
    } else {
      context.lineTo(x, y - length)
      context.lineTo(x + arrowWidth, y - length + arrowSize)
      context.moveTo(x, y - length)
      context.lineTo(x - arrowWidth, y - length + arrowSize)
    }
  } else {
    context.lineTo(x + length, y)
    context.lineTo(x + length - arrowSize, y + arrowWidth)
    context.moveTo(x + length, y)
    context.lineTo(x + length - arrowSize, y - arrowWidth)
  }
  context.lineWidth = 0
  context.stroke()
}
