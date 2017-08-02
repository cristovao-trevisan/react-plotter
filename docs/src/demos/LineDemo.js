import React from 'react'
import Plotter from '../../../src/Plotter'
import LineStyle from '../../../src/plot-styles/line'
import {Sinewave} from '../../../src/helpers/waveGenerators'
import CircleMarker from '../../../src/markers/circle'
import Code from '../Code'

const codeString = (strokeColor, strokeWidth, hasMarker, markerColor) => (
`import LineStyle from 'react-plotter/plot-styles/line'
import CircleMarker from 'react-plotter/markers/circle'

const style = LineStyle({
  strokeColor: '${strokeColor}',
  strokeWidth: ${strokeWidth}${hasMarker ? ',' : ''}
  ` + (hasMarker ? `marker:
    CircleMarker({circleColor: '${markerColor}'})
` : '') +
`})
<Plotter
  data={this.state.data}
  style={style}/>`
)

const styleProps = ['strokeColor', 'strokeWidth', 'markerColor', 'hasMarker']

const sinewave = Sinewave(10000, 10, 10000, 100)
export default class LineDemo extends React.Component {
  constructor (props) {
    super(props)

    this.style = LineStyle({
      strokeColor: this.state.strokeColor,
      strokeWidth: this.state.strokeWidth,
      marker: this.state.hasMarker ? CircleMarker({
        circleColor: this.state.markerColor
      }) : undefined
    })
  }

  state = {
    strokeColor: '#0000ff',
    strokeWidth: 1,
    markerColor: '#000000',
    hasMarker: true,
    data: []
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        data: sinewave(100)
      })
    }, 50)
  }

  componentWillUpdate (nextProps, nextState) {
    for (let prop of styleProps) {
      if (nextState[prop] !== this.state[prop]) {
        this.style = LineStyle({
          strokeColor: nextState.strokeColor,
          strokeWidth: nextState.strokeWidth,
          marker: nextState.hasMarker ? CircleMarker({
            circleColor: nextState.markerColor
          }) : undefined
        })
      }
    }
  }

  render () {
    if (this.props.showCode) {
      var toRender = (
        <Code>
          {codeString(this.state.strokeColor, this.state.strokeWidth, this.state.hasMarker, this.state.markerColor)}
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
            dataSize={5000}
            pixelSkip={3}
            initialData={sinewave(2000)}
            appendData={this.state.data} />
          <input type='checkbox'
            style={{position: 'absolute', right: 'calc(2.2em + 15%)', height: 13, bottom: 'calc(70% + 1.1em - 6.5px)'}}
            checked={this.state.hasMarker}
            onChange={(e) => this.setState({hasMarker: e.target.checked})} />
          <input type='color'
            style={{width: '2.2em', height: '2.2em', position: 'absolute', right: '10%', bottom: '70%'}}
            value={this.state.markerColor}
            onChange={(e) => this.setState({markerColor: e.target.value})} />
          <input type='number'
            style={{width: '2.2em', height: '2.2em', position: 'absolute', right: '10%', bottom: '40%'}}
            min={1}
            value={this.state.strokeWidth}
            onChange={(e) => this.setState({strokeWidth: e.target.value})} />
          <input type='color'
            style={{width: '2.2em', height: '2.2em', position: 'absolute', right: '10%', bottom: '10%'}}
            value={this.state.strokeColor}
            onChange={(e) => this.setState({strokeColor: e.target.value})} />
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
