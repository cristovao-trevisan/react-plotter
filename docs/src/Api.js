import React from 'react'
import {Header, Table, Menu} from 'semantic-ui-react'
import Code from './Code'

const MenuHeader = (title) => (
  <Menu.Item>
    {title}
  </Menu.Item>
)

const MenuItem = (title, id) => (
  <Menu.Item key={title}>
    <a href={'#' + (id || title)}>{title}</a>
  </Menu.Item>
)

export const ApiItens = [
  MenuItem('Plotter'),
  MenuHeader('Styles'),
  MenuItem('Line', 'LineStyle'),
  MenuItem('Digital', 'DigitalStyle'),
  MenuHeader('Markers'),
  MenuItem('Circle', 'CircleMarker')
]

const plotterText =
`import Plotter from 'react-plotter/Plotter'

// ...
  <Plotter
    style={LineStyle(...)}
    width={300}
    height={150}
    dataSize={100}
    pixelSkip={1}
    max={100}
    min={-100}
    useMean={false}
    initialData={[]}
    appendData={this.state.data}
    trigger={0}
    onlyFull />
`
export const Plotter = () => (
  <div style={{width: '100%'}} id='Plotter'>
    <Header as='h2' content='Plotter' />
    <Code>
      {plotterText}
    </Code>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Property</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>style</Table.Cell>
          <Table.Cell>Function</Table.Cell>
          <Table.Cell>{'Style function (called to print the data)'}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[trigger]</Table.Cell>
          <Table.Cell>number</Table.Cell>
          <Table.Cell>Use trigger</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[onlyFull=true]</Table.Cell>
          <Table.Cell>bool</Table.Cell>
          <Table.Cell>When using trigger it tells if the view should wait for a complete dataset before updating</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[width=300]</Table.Cell>
          <Table.Cell>number</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[height=150]</Table.Cell>
          <Table.Cell>number</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[initialData=[]]</Table.Cell>
          <Table.Cell>number[]</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[appendData=[]]</Table.Cell>
          <Table.Cell>number[]</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[dataSize=100]</Table.Cell>
          <Table.Cell>number</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[pixelSkip=1]</Table.Cell>
          <Table.Cell>number</Table.Cell>
          <Table.Cell>Pixels between points</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[max=100]</Table.Cell>
          <Table.Cell>number</Table.Cell>
          <Table.Cell>Max Y Value</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[min=-100]</Table.Cell>
          <Table.Cell>number</Table.Cell>
          <Table.Cell>Min Y Value</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[useMean=true]</Table.Cell>
          <Table.Cell>bool</Table.Cell>
          <Table.Cell>Use mean calculation, otherwise median</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

const lineText =
`import LineStyle from 'react-plotter/plot-styles/line'

let style = LineStyle({
  strokeWidth: 2,
  strokeColor: '#ffeedd'
})
`
export const LineStyle = () => (
  <div style={{width: '100%'}} id='LineStyle'>
    <Header as='h2' content='Line' />
    <Code>
      {lineText}
    </Code>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Parameter</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>[props={}]</Table.Cell>
          <Table.Cell>object</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.strokeWidth=1]</Table.Cell>
          <Table.Cell>number</Table.Cell>
          <Table.Cell>Line width</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.strokeColor='blue']</Table.Cell>
          <Table.Cell>string</Table.Cell>
          <Table.Cell>Line color</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.marker]</Table.Cell>
          <Table.Cell>{'function'}</Table.Cell>
          <Table.Cell>Marker Function</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

const digitalText =
`import DigitalStyle from 'react-plotter/plot-styles/digital'

let style = DigitalStyle({
  strokeWidth: 2,
  strokeColor: '#ffeedd'
})
`
export const DigitalStyle = () => (
  <div style={{width: '100%'}} id='DigitalStyle'>
    <Header as='h2' content='Digital' />
    <Code>
      {digitalText}
    </Code>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Parameter</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>[props={}]</Table.Cell>
          <Table.Cell>object</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.strokeWidth=1]</Table.Cell>
          <Table.Cell>number</Table.Cell>
          <Table.Cell>Line width</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.strokeColor='blue']</Table.Cell>
          <Table.Cell>string</Table.Cell>
          <Table.Cell>Line color</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.marker]</Table.Cell>
          <Table.Cell>{'function'}</Table.Cell>
          <Table.Cell>Marker Function</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

const circleMarkerText =
`import CircleMarker from 'react-plotter/marker/circle'

let marker = CircleMarker({
  circleRadius: 2,
  circleColor: '#ffeedd'
})
`
export const CircleMarker = () => (
  <div style={{width: '100%'}} id='CircleMarker'>
    <Header as='h2' content='Circle' />
    <Code>
      {circleMarkerText}
    </Code>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Parameter</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>[props={}]</Table.Cell>
          <Table.Cell>object</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.circleRadius=2]</Table.Cell>
          <Table.Cell>number</Table.Cell>
          <Table.Cell>Marker radius</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>[props.circleColor='red']</Table.Cell>
          <Table.Cell>string</Table.Cell>
          <Table.Cell>Marker color</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

const SectionHeader = ({title}) => (
  <Header
    as='h1'
    textAlign='center'
    content={title}
    style={{ fontSize: '2.8em', fontWeight: 'normal' }} />
)

const Api = () => (
  <div style={{width: '100%'}}>
    <SectionHeader title='API' />
    <Plotter />
    <SectionHeader title='Styles' />
    <LineStyle />
    <div style={{width: '100%', height: '30px'}} />
    <DigitalStyle />
    <SectionHeader title='Markers' />
    <CircleMarker />
  </div>
)

export default Api
