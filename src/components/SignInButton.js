import React, { Component } from 'react';
import { signIn } from "../utils/auth"

class SignInButton extends Component {
  render() {
    return (
      <button onClick={signIn}>Sign in</button>
    )
  }
}

export default SignInButton;