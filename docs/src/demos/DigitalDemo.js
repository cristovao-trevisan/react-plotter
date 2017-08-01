import React from 'react'
import Plotter from '../../../src/Plotter'
import DigitalStyle from '../../../src/plot-styles/digital'
import CircleMarker from '../../../src/markers/circle'
import {Trianglewave} from '../../../src/helpers/waveGenerators'
import Code from '../Code'

const codeString = (strokeColor, strokeWidth, markerColor) => (
`import DigitalStyle from 'react-plotter/plot-styles/digital'
import CircleMarker from 'react-plotter/markers/circle'

<Plotter
  style={DigitalStyle({
    strokeColor: '${strokeColor}',
    strokeWidth: ${strokeWidth},
    marker: CircleMarker({
      circleColor: '${markerColor}'
    })
  })} />
`)

const styleProps = ['strokeWidth', 'strokeColor', 'markerColor']

const sinewave = Trianglewave(80, 2, 80, 100)
export default class DigitalDemo extends React.Component {
  constructor (props) {
    super(props)

    this.style = DigitalStyle({
      strokeColor: this.state.strokeColor,
      strokeWidth: this.state.strokeWidth,
      marker: CircleMarker({
        circleColor: this.state.markerColor
      })
    })
  }

  state = {
    strokeColor: '#000000',
    markerColor: '#0000ff',
    strokeWidth: 1,
    data: [],
    showCode: false
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        data: sinewave(2)
      })
    }, 50)
  }

  componentWillUpdate (nextProps, nextState) {
    for (let prop of styleProps) {
      if (nextState[prop] !== this.state[prop]) {
        this.style = DigitalStyle({
          strokeColor: this.state.strokeColor,
          strokeWidth: this.state.strokeWidth,
          marker: CircleMarker({
            circleColor: this.state.markerColor
          })
        })
      }
    }
  }

  render () {
    if (this.props.showCode) {
      var toRender = (
        <Code>
          {codeString(this.state.strokeColor, this.state.strokeWidth, this.state.markerColor)}
        </Code>
      )
    } else {
      let width = window.innerWidth * 0.4
      toRender = (
        <div style={{height: 150, width: '100%'}}>
          <Plotter
            style={this.style}
            width={width}
            height={150}
            dataSize={80}
            initialData={sinewave(40)}
            appendData={this.state.data} />
          <input type='number'
            style={{width: '2.2em', height: '2.2em', position: 'absolute', right: '10%', bottom: '70%'}}
            min={1}
            value={this.state.strokeWidth}
            onChange={(e) => this.setState({strokeWidth: e.target.value})} />
          <input type='color'
            style={{width: '2.2em', height: '2.2em', position: 'absolute', right: '10%', bottom: '40%'}}
            value={this.state.strokeColor}
            onChange={(e) => this.setState({strokeColor: e.target.value})} />
          <input type='color'
            style={{width: '2.2em', height: '2.2em', position: 'absolute', right: '10%', bottom: '10%'}}
            value={this.state.markerColor}
            onChange={(e) => this.setState({markerColor: e.target.value})} />
        </div>
      )
    }
    return (
      <div style={{width: '100%', position: 'relative'}}>
        {toRender}
      </div>
    )
  }
}
