import React from 'react'
import {Header, Menu, Segment, Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

import LineDemo from './demos/LineDemo'
import DigitalDemo from './demos/DigitalDemo'
import Api, {ApiItens} from './Api'

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
        <div style={{float: 'left', width: '8%', height: '100%'}} />
        <div style={{float: 'left', width: '20%', height: '100%'}}>
          <Menu vertical size='large' style={{width: '80%'}}>
            {MenuItem('Line')}
            {MenuItem('Digital')}
            {ApiItens}
          </Menu>
        </div>
        <div style={{float: 'left', width: '60%'}}>
          {SegmentItem('Line', <LineDemo showCode={!!this.state.showCode['Line']} />, this.onShowCodeClick)}
          {SegmentItem('Digital', <DigitalDemo showCode={!!this.state.showCode['Digital']} />, this.onShowCodeClick)}
        </div>
        <div style={{width: '60%', float: 'left', marginTop: '5%'}}>
          <Api />
        </div>
        <div style={{width: '60%', float: 'left', height: '300px'}} />
      </div>
    )
  }
}
