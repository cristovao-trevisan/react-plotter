import React from 'react'

import Plotter from '../src/Plotter'
import line from '../src/plot-styles/line'
import digital from '../src/plot-styles/digital'
import circleMarker from '../src/markers/circle'

import tone from 'tonegenerator'
let lut = tone(50, 1, 40, 44000)

const styles = [
  digital(),
  line(),
  line({ marker: circleMarker() })
]

export default class ServerApp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      style: styles[0]
    }

    this.count = 0
    this.styleCount = 0
  }

  getData (n) {
    let init = this.count
    this.count = (this.count + n) % lut.length
    if (init < this.count) {
      return lut.slice(init, this.count)
    } else {
      return lut.slice(init).concat(lut.slice(0, this.count))
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        data: this.getData(100)
      })
    }, 100)
    setInterval(() => {
      this.styleCount = (this.styleCount + 1) % styles.length
      this.setState({
        style: styles[this.styleCount]
      })
    }, 2000)
  }

  render () {
    return (
      <Plotter
        style={this.state.style}
        width={600}
        height={400}
        initialData={[]}
        dataSize={2000}
        appendData={this.state.data} />
    )
  }
}
