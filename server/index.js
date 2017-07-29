import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import ServerApp from './ServerApp'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(ServerApp)

if (module.hot) {
  module.hot.accept('./ServerApp', () => {
    const NextApp = require('./ServerApp').default
    render(NextApp)
  })
}
