import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"
import Profile from "../components/Profile"
import Login from "../components/Login"
import { Auth } from "aws-amplify"

class App extends React.Component {
  constructor(props) {
    super(props)

    this.userHasAuthenticated = this.userHasAuthenticated.bind(this)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    }
  }

  userHasAuthenticated(authenticated) {
    this.setState({ isAuthenticated: authenticated })
  }

  componentDidMount = async () => {
    try {
      await Auth.currentSession()
      this.userHasAuthenticated(true)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }

    this.setState({ isAuthenticating: false })
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    }

    return (
      !this.state.isAuthenticating &&
      <Layout props={childProps}>
        <Router>
          <PrivateRoute path="/app/profile" component={Profile} props={childProps}/>
          <Login path="/app/login" {...childProps}/>
        </Router>
      </Layout>
    )
  }
}

export default App
