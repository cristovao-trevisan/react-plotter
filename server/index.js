import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import TestApp from './TestApp'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(TestApp)

if (module.hot) {
  module.hot.accept('./TestApp', () => {
    const NextApp = require('./TestApp').default
    render(NextApp)
  })
}
