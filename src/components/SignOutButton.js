import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignOutButton extends Component {
    render() {
        return <button onClick={this.signOut}>Sign out</button>;
    }

    signOut = () => {
        Auth.signOut()
            .then(() => {
                // update store
                console.log('signed out');
            })
            .catch(e => {
                console.error(e);
            });
    };
}

export default SignOutButton;
