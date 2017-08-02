## Installation
`npm install react-plotter --save`

## API
[Live Demo and API](https://cristovao-trevisan.github.io/react-plotter/)

## Usage

```js
import line from 'react-plotter/plot-styles/line'
import circleMarker from 'react-plotter/markers/circle'
setInterval(() => {
  this.setState({
    data: sinewave(100)
  })
}, 50)

<Plotter
  style={line({marker: circleMarker()})}
  width={600}
  height={400}
  dataSize={5000}
  initialData={sinewave(1000)}
  appendData={this.state.data}
  trigger={0} />
```


## TODO

- Tests
