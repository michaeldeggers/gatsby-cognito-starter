import React, { Component } from 'react';
import { signOut } from "../utils/auth"

class SignOutButton extends Component {
  render() {
    return (
      <button onClick={signOut}>Sign out</button>
    )
  }
}

export default SignOutButton;