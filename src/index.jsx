import '@babel/polyfill'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Router, Switch, Route } from 'react-router'
import store from './store/configureStore'
import history from './services/history'

import GlobalStyle from './components/GlobalStyle'
import Login from './components/pages/Login'
import Conference from './containers/Conference'
import theme from './themes/default'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/feedback' component={() => (<div>test</div>)} />
            <Route path='/:roomId' component={Conference} />
          </Switch>
        </Router>
      </Fragment>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)
