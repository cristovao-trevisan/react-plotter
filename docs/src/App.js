import React from 'react'
import {Header, Menu, Segment, Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

import LineDemo from './demos/LineDemo'
import DigitalDemo from './demos/DigitalDemo'
import TriggerDemo from './demos/TriggerDemo'
import Api, {ApiItens} from './Api'

const MenuHeader = (title) => (
  <Menu.Item style={{fontSize: 18}}>
    {title}
  </Menu.Item>
)

const MenuItem = (title) => (
  <Menu.Item>
    <a href={'#' + title}>{title}</a>
  </Menu.Item>
)

const SegmentItem = (title, Component, onShowCodeClick) => (
  <Segment>
    <Header as='h2' id={title}>
      {title}
      <Icon name='code' size='large'
        style={{position: 'absolute', right: 0, fontSize: '1em'}}
        onClick={() => onShowCodeClick(title)} />
    </Header>
    {Component}
  </Segment>
)

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.onShowCodeClick = this.onShowCodeClick.bind(this)
  }

  state = {
    showCode: {}
  }

  onShowCodeClick (title) {
    let {showCode} = this.state
    this.setState({
      showCode: {
        ...showCode,
        [title]: !showCode[title]
      }
    })
  }

  render () {
    return (
      <div className='full-container'>
        <div style={{width: '100%', textAlign: 'center', background: 'rgb(156, 156, 220)', padding: '2em', marginBottom: '1em'}}>
          <Header
            as='h1'
            content='React-Plotter'
            style={{ fontSize: '3em', fontWeight: 'normal' }} />
        </div>
        <div style={{width: '100%', marginLeft: '8%', marginRight: '10%'}}>
          <div style={{float: 'left', width: '20%', height: '100%'}}>
            <Menu vertical size='large' style={{width: '80%'}}>
              {MenuHeader('Examples')}
              {MenuItem('Line')}
              {MenuItem('Digital')}
              {MenuItem('Trigger')}
              {MenuHeader('API')}
              {ApiItens}
            </Menu>
          </div>
          <div style={{float: 'left', width: '60%'}}>
            <Header as='h1' textAlign='center' content='Examples'
              style={{ fontSize: '2.8em', fontWeight: 'normal' }} />
            {SegmentItem('Line', <LineDemo showCode={!!this.state.showCode['Line']} />, this.onShowCodeClick)}
            {SegmentItem('Digital', <DigitalDemo showCode={!!this.state.showCode['Digital']} />, this.onShowCodeClick)}
            {SegmentItem('Trigger', <TriggerDemo showCode={!!this.state.showCode['Trigger']} />, this.onShowCodeClick)}
            <div style={{width: '100%', marginTop: '5%'}} />
            <Api />
          </div>
          <div style={{width: '60%', float: 'left', height: '300px'}} />
        </div>
      </div>
    )
  }
}
