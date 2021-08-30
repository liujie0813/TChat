import React, { Fragment } from 'react'
import Login from './containers/login'
import Home from './containers/home'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route exact path="/" component={Home} />
          <Redirect to={"/home"} />
        </Switch>
      </HashRouter>
    </Fragment>
  )
}

export default App;
