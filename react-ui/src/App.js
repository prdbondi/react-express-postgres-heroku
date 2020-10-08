import React, { Component } from 'react'
import LogIn from "./components/Layouts/LogIn"
import Dashboard from "./components/Layouts/Dashboard"
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./components/Layouts/ProtectedRoute"


class App extends Component {
  state = {
    hello: null,
    postgres: null,
    error: null
  }

  componentDidMount() {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => {
        this.setState({ hello: data })
      })

    fetch('/api/postgres')
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }

        return res
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ postgres: data })
      })
      .catch(err => {
        this.setState({ error: err.toString() })
      })
  }
  render() {
    const { hello, postgres, error } = this.state

    return (
      <div className="App">
        <Router>
      <Switch>
        <Route path="/login">
          <LogIn />
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="dashboard" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard" />
        </Route>
      </Switch>
    </Router>
      </div>
    )
  }
}

export default App
