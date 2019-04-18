import React, { Component } from "react"
import { navigate } from "gatsby"
import { getCurrentAuthenticatedUser, signIn, signOut } from "../utils/auth"
import SignInButton from "./SignInButton"
import SignOutButton from "./SignOutButton"

const isBrowser = () => typeof window !== "undefined"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authState: "loading",
      authData: null,
      authError: null,
    }
  }

  componentDidMount() {
    console.log("on component mount", this.props)
    getCurrentAuthenticatedUser().then(user => {
      console.log(user)
      this.props.userHasAuthenticated(true);
      this.setState({ authState: "signedIn" })
      navigate('/app/profile')
    }).catch(e => {
      console.log(e)
      this.setState({ authState: "signIn" })
    })
  }

  render() {
    const { authState } = this.state
    return (
      <div className="App">
        {authState === "loading" && (<div>loading...</div>)}
        {authState === "signIn" && <SignInButton />}
        {authState === "signedIn" && <SignOutButton />}
      </div>
    )
  }
}

export default Login

