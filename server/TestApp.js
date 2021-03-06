import React from 'react'

import Plotter from '../src/Plotter'
import line from '../src/plot-styles/line'
import digital from '../src/plot-styles/digital'
import circleMarker from '../src/markers/circle'

import {Sinewave} from '../src/helpers/waveGenerators'
let sinewave = Sinewave(10000, 33, 10000, 100)

const styles = [
  line(),
  digital(),
  line({ marker: circleMarker() })
]

export default class TestApp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      style: styles[0],
      updateStyle: false,
      updateData: true
    }
    this.styleCount = 0
  }

  componentDidMount () {
    setInterval(() => {
      if (this.state.updateData) {
        this.setState({
          data: sinewave(1000)
        })
      }
    }, 100)
    setInterval(() => {
      if (this.state.updateStyle) {
        this.styleCount = (this.styleCount + 1) % styles.length
        this.setState({
          style: styles[this.styleCount]
        })
      }
    }, 2000)
  }

  render () {
    return (
      <div>
        <Plotter
          style={this.state.style}
          width={600}
          height={400}
          dataSize={2000}
          pixelSkip={1}
          initialData={[]}
          appendData={this.state.data}
          trigger={0} />
        <button onClick={() => this.setState({updateData: !this.state.updateData})}>
          {this.state.updateData ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => this.setState({updateStyle: !this.state.updateStyle})}>
          {this.state.updateStyle ? 'Keep Style' : 'Change Style'}
        </button>
      </div>
    )
  }
}
