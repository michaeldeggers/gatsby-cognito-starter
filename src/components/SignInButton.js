import React, { Component } from 'react';
import { isBrowser } from '../utils/auth';
import { Auth } from 'aws-amplify';
import { connect } from "react-redux";

const wrapElementWithDispatch = () => {

};

class SignInButton extends Component {
    render() {
        return <button onClick={this.signIn}>Sign in</button>;
    }

    signIn = () => {
        if (!isBrowser) {
            return;
        }
        Auth.federatedSignIn()
            .then(user => {
              // update store
              console.log(user);
            })
            .catch(e => console.error(e));
    };
}

export default connect()(SignInButton);
