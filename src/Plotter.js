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
    pixelSkip: 1,
    max: 100,
    min: -100,
    useMean: true
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    initialData: PropTypes.arrayOf(PropTypes.number),
    appendData: PropTypes.arrayOf(PropTypes.number),
    max: PropTypes.number,
    min: PropTypes.number,
    dataSize: PropTypes.number,
    style: PropTypes.func.isRequired,
    pixelSkip: (props, propName, componentName) => {
      if (!Number.isInteger(props[propName])) return new Error('Must be an integer')
      if (props[propName] < 1) return new Error('Must be greater than 1')
    },
    useMean: PropTypes.bool
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
    this.maxPoints = this.xSize / this.props.pixelSkip
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
   * @param {boolean} [update=false] Used when the attributes are reset (inside the componentWillUpdate)
   */
  addData (newData, update = false) {
    if (newData.length + this.dataBuffer.length > this.props.dataSize) {
      this.translationCount += newData.length + this.dataBuffer.length - this.props.dataSize
      this.translationCount = Math.min(this.translationCount, this.props.dataSize)
      this.dataBuffer = this.dataBuffer.concat(newData)
      this.dataBuffer.splice(0, this.dataBuffer.length - this.props.dataSize)
    } else {
      this.dataBuffer = this.dataBuffer.concat(newData)
    }
    if (update) this.translationCount = this.dataBuffer.length
    this.renewCount += newData.length
    this.renewCount = Math.min(this.renewCount, this.props.dataSize)
    this.animationRequest = window.requestAnimationFrame(this.updateCanvas.bind(this))
  }

  /**
   * ALGO
   1 - clear drawingBuffer
   2 - copy plotBuffer to drawingBuffer removing extra data
   3 - draw new data on drawingBuffer
   4 - copy drawingBuffer to plotBuffer
   5 - copy plotBuffer to canvas
   6 - draw arrows on canvas
  */
  updateCanvas () {
    if (this.renewCount < this.xSkip) return
    // 1
    this.drawingBufferContext.clearRect(0, 0, this.props.width, this.props.height)
    // 2
    let translation = -this.deltaX * Math.floor(this.translationCount / this.xSkip)
    this.drawingBufferContext.drawImage(this.plotBuffer, translation, 0)
    // 3
    for (var i = 0; i < this.renewCount - this.xSkip; i += this.xSkip) {
      let index = i + this.dataBuffer.length - this.renewCount
      if (this.props.useMean) {
        var length = this.dataBuffer.slice(index, index + this.xSkip).reduce((sum = 0, value) => (sum + value)) / this.xSkip
      } else {
        length = this.dataBuffer[index]
      }
      length *= this.ySize / this.range
      this.props.style(this.drawingBufferContext, {
        x: this.baseX + this.deltaX * index / this.xSkip,
        y: this.baseY,
        deltaX: i === 0 ? -translation : 0,
        length
      })
    }
    this.renewCount -= i - this.xSkip
    this.translationCount = 0
    // 4
    this.plotBufferContext.clearRect(0, 0, this.props.width, this.props.height)
    this.plotBufferContext.drawImage(this.drawingBuffer, 0, 0)
    // 5
    this.context.clearRect(0, 0, this.props.width, this.props.height)
    this.context.drawImage(this.plotBuffer, 0, 0)
    this.context.clearRect(0, 0, MARGIN, this.props.height)
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
    this.addData(oldBuffer, true)
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

export default Plotter
