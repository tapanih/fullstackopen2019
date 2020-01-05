import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import './App.css'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'

import { logoutUser } from './reducers/userReducer'

const App = (props) => {

  const padding = { padding: 5 }

  useEffect(() => {
    if (props.user) {
      blogService.setToken(props.user.token)
    }
  }, [props.user])

  const handleLogout = (event) => {
    event.preventDefault()
    props.logoutUser()
  }

  return (
    <div>
      <Router>
        <Notification />
        {props.user === null
          ? <LoginForm />
          : <>
            <div>
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              {props.user.name} logged in
              <button onClick={handleLogout} type="button">
                logout
              </button>
            </div>
              <Route exact path="/" render={() => <Blogs />} />
              <Route exact path="/users" render={() => <Users />} />
              <Route path="/users/:id" render={({ match }) =>
                <User id={match.params.id} />
              } />
              <Route path="/blogs/:id" render={({ match }) =>
                <Blog id={match.params.id} />
              } />
            </>}
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logoutUser,
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp
