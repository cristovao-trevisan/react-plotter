import React from 'react'
import PropTypes from 'prop-types'
import { drawArrow } from './helpers/draw'

const MARGIN = 5
const ARROW_SIZE = 12

const reRenderProps = ['width', 'height', 'dataSize', 'max', 'min', 'style']

/**
 * Use the exported buildPlotter function to create an usable class
 * @abstract
 */
class Plotter extends React.Component {
  constructor (props) {
    super(props)

    window.plotter = this
  }

  static defaultProps = {
    width: 300,
    height: 150,
    initialData: [],
    appendData: [],
    dataSize: 100,
    max: 50,
    min: -50
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    initialData: PropTypes.arrayOf(PropTypes.number),
    appendData: PropTypes.arrayOf(PropTypes.number),
    max: PropTypes.number,
    min: PropTypes.number,
    dataSize: PropTypes.number,
    style: PropTypes.func.isRequired
  }

  /**
   * @abstract
   * @param {CanvasRenderingContext2D} context
   * @param {Object} options
   * @param {number} options.x X base for this point
   * @param {number} options.y Y base for this point
   * @param {number} options.length Y size for this point
   */
  drawValue (context, {x, y, length}) {
    throw new Error('Abstract Function Call')
  }

  /**
   * @private
   * @desc Update attributes based on props, called after any props change
   */
  setAttributes () {
    this.dataBuffer = []
    this.renewCount = 0
    this.translationCount = 0
    // y data range
    this.range = this.props.max - this.props.min
    // x axis staring point
    this.baseX = MARGIN
    // y pixel range
    this.ySize = (this.props.height - 2 * MARGIN - ARROW_SIZE)
    // x pixel range
    this.xSize = (this.props.width - 2 * MARGIN - ARROW_SIZE)
    // max points
    this.maxPoints = this.xSize / 4
    // delta x
    this.deltaX = this.xSize / Math.min(this.maxPoints, this.props.dataSize)
    this.deltaX = Math.floor(this.deltaX)
    // x skip integer (samples to skip, because there are limited points/pixels)
    this.xSkip = Math.ceil(this.props.dataSize / this.maxPoints)
    // horizontal axis in the middle
    if (this.props.min < 0 && this.props.max > 0) {
      this.invertedArrow = false
      this.baseY = MARGIN + ARROW_SIZE + this.ySize * this.props.max / (this.range)
    // horizontal axis at the top
    } else if (this.props.min < 0 && this.props.max <= 0) {
      this.invertedArrow = true
      this.baseY = MARGIN
    // horizontal axis at the bottom
    } else {
      this.invertedArrow = false
      this.baseY = this.props.height - MARGIN
    }
  }

  /**
   * @private
   * Create internal buffers
   *  must be called after any width/height change
   */
  createBuffers () {
    this.drawingBuffer = document.createElement('canvas')
    this.plotBuffer = document.createElement('canvas')
    this.plotBuffer.width = this.drawingBuffer.width = this.props.width
    this.plotBuffer.height = this.drawingBuffer.height = this.props.height
    this.drawingBufferContext = this.drawingBuffer.getContext('2d')
    this.plotBufferContext = this.plotBuffer.getContext('2d')
  }

  /**
   * @public
   * @desc Used by parent to add data (through refs)
   * @param {number[]} newData
   */
  addData (newData) {
    if (newData.length + this.dataBuffer.length > this.props.dataSize) {
      this.translationCount += newData.length + this.dataBuffer.length - this.props.dataSize
      this.translationCount = Math.min(this.translationCount, this.props.dataSize)
      this.dataBuffer = this.dataBuffer.concat(newData)
      this.dataBuffer.splice(0, this.dataBuffer.length - this.props.dataSize)
    } else {
      this.dataBuffer = this.dataBuffer.concat(newData)
    }
    this.renewCount += Math.min(newData.length, this.dataBuffer.length)
    this.animationRequest = window.requestAnimationFrame(this.updateCanvas.bind(this))
  }

  /** ALGO
   1 - clear drawingBuffer
   2 - copy plotBuffer to drawingBuffer removing extra data
   3 - draw new data on drawingBuffer
   4 - copy drawingBuffer to plotBuffer
   5 - copy plotBuffer to canvas
   6 - draw arrows on canvas
  */
  updateCanvas () {
    // 1
    this.drawingBufferContext.clearRect(0, 0, this.props.width, this.props.height)
    // 2
    this.drawingBufferContext.drawImage(this.plotBuffer, -this.deltaX * Math.floor(this.translationCount / this.xSkip), 0)
    this.drawingBufferContext.clearRect(0, 0, MARGIN, this.props.height)
    // 3
    for (let i = 0; i < this.renewCount; i += this.xSkip) {
      let index = i + this.dataBuffer.length - this.renewCount
      this.props.style(this.drawingBufferContext, {
        x: this.baseX + this.deltaX * index / this.xSkip,
        y: this.baseY,
        length: this.dataBuffer[index] * this.ySize / this.range
      })
    }
    this.renewCount = 0
    this.translationCount = 0
    // 4
    this.plotBufferContext.clearRect(0, 0, this.props.width, this.props.height)
    this.plotBufferContext.drawImage(this.drawingBuffer, 0, 0)
    // 5
    this.context.clearRect(0, 0, this.props.width, this.props.height)
    this.context.drawImage(this.plotBuffer, 0, 0)
    // horizontal arrow
    drawArrow(this.context, this.baseX, this.baseY, this.props.width - 2 * MARGIN, ARROW_SIZE - 1, false)
    // vertical arrow
    drawArrow(this.context, this.baseX, this.props.height - MARGIN, this.props.height - 2 * MARGIN, ARROW_SIZE - 1, true, this.invertedArrow)
  }

  componentDidMount () {
    // Get actual context
    this.context = this.refs.canvas.getContext('2d')
    this.createBuffers()
    this.setAttributes()
    this.addData(this.props.initialData)
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.appendData !== nextProps.appendData) {
      this.addData(nextProps.appendData)
    }
    for (let prop of reRenderProps) {
      if (nextProps[prop] !== this.props[prop]) return true
    }
    return false
  }

  componentWillUpdate () {
    let oldBuffer = this.dataBuffer
    this.createBuffers()
    this.setAttributes()
    this.addData(oldBuffer)
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.animationRequest)
  }

  render () {
    return (
      <canvas
        ref='canvas'
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}

module.exports = Plotter
