import React from 'react'
import Plotter from '../../../src/Plotter'
import LineStyle from '../../../src/plot-styles/line'
import {Sawtoothwave} from '../../../src/helpers/waveGenerators'
import CircleMarker from '../../../src/markers/circle'
import Code from '../Code'

const codeString = (trigger, onlyFull) => (
`import LineStyle from 'react-plotter/plot-styles/line'
import CircleMarker from 'react-plotter/markers/circle'

const style = LineStyle({marker: CircleMarker()})
<Plotter
  data={this.state.data}
  style={style}
  trigger={${trigger}}
  ` + (onlyFull ? 'onlyFull ' : '') + '/>'
)

const style = LineStyle({marker: CircleMarker()})
const sawtoothWave = Sawtoothwave(10000, 22.7, 10000, 100)
export default class TriggerDemo extends React.Component {
  state = {
    trigger: 20,
    onlyFull: true
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        data: sawtoothWave(500)
      })
    }, 100)
  }

  render () {
    if (this.props.showCode) {
      var toRender = (
        <Code>
          {codeString(this.state.trigger, this.state.onlyFull)}
        </Code>
      )
    } else {
      let width = window.innerWidth * 0.4
      toRender = (
        <div style={{height: 150, width: '100%'}}>
          <Plotter
            style={style}
            width={width}
            height={150}
            dataSize={1000}
            pixelSkip={3}
            appendData={this.state.data}
            trigger={this.state.trigger}
            onlyFull={this.state.onlyFull} />
          <div style={{position: 'absolute', right: '7%', height: 13, bottom: 'calc(40% + 1.1em - 6.5px)'}}>
            <input type='checkbox'
              checked={this.state.onlyFull}
              onChange={(e) => this.setState({onlyFull: e.target.checked})} />
            {' onlyFull'}
          </div>
          <input type='number'
            style={{width: '4em', height: '2.2em', position: 'absolute', right: '8%', bottom: '10%'}}
            value={this.state.trigger}
            onChange={(e) => this.setState({trigger: e.target.value})} />
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
