import React, { Suspense, lazy } from 'react'
import { createBrowserHistory } from 'history'
import { Route, Switch, Redirect, Router } from 'react-router-dom'
import { loading } from './utilities'
// import 'assets/css/material-dashboard-react.css?v=1.8.0'

const Admin = lazy(() => import('./layouts/Admin'))

const hist = createBrowserHistory()

const App = () => (
  <Router history={hist}>
    <Suspense fallback={loading()}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Suspense>
  </Router>
)

export default App
