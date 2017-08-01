import React from 'react'
import {Header, Table, Menu} from 'semantic-ui-react'
import Code from './Code'

const MenuItem = (title) => (
  <Menu.Item key={title}>
    <a href={'#' + title}>{title}</a>
  </Menu.Item>
)

export const ApiItens = [
  MenuItem('LineStyle'),
  MenuItem('DigitalStyle'),
  MenuItem('CircleMarker')
]

const lineText =
`import LineStyle from 'react-plotter/plot-styles/line'

let style = LineStyle({
  strokeWidth: 2,
  strokeColor: '#ffeedd'
})
`
export const LineStyle = () => (
  <div style={{width: '100%'}} id='LineStyle'>
    <Header as='h2' content='LineStyle' />
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
          <Table.Cell>props</Table.Cell>
          <Table.Cell>[object]</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.strokeWidth</Table.Cell>
          <Table.Cell>[number=1]</Table.Cell>
          <Table.Cell>Line width</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.strokeColor</Table.Cell>
          <Table.Cell>[string='blue']</Table.Cell>
          <Table.Cell>Line color</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.marker</Table.Cell>
          <Table.Cell>[{'function'}]</Table.Cell>
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
    <Header as='h2' content='DigitalStyle' />
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
          <Table.Cell>props</Table.Cell>
          <Table.Cell>[object]</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.strokeWidth</Table.Cell>
          <Table.Cell>[number=1]</Table.Cell>
          <Table.Cell>Line width</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.strokeColor</Table.Cell>
          <Table.Cell>[string='blue']</Table.Cell>
          <Table.Cell>Line color</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.marker</Table.Cell>
          <Table.Cell>[{'function'}]</Table.Cell>
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
    <Header as='h2' content='CircleMarker' />
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
          <Table.Cell>props</Table.Cell>
          <Table.Cell>[object]</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.circleRadius</Table.Cell>
          <Table.Cell>[number=2]</Table.Cell>
          <Table.Cell>Marker radius</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>props.circleColor</Table.Cell>
          <Table.Cell>[string='red']</Table.Cell>
          <Table.Cell>Marker color</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

const Api = () => (
  <div style={{width: '100%'}}>
    <Header
      as='h1'
      id='API'
      textAlign='center'
      content='API'
      style={{ fontSize: '2.8em', fontWeight: 'normal' }} />
    <LineStyle />
    <div style={{width: '100%', height: '30px'}} />
    <DigitalStyle />
    <div style={{width: '100%', height: '30px'}} />
    <CircleMarker />
  </div>
)

export default Api
