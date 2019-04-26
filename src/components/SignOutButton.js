import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {
            dispatch({ type: `LOG_OUT` });
        },
    };
};

class SignOutButton extends Component {
    render() {
        return <button onClick={this.signOut}>Sign out</button>;
    }

    signOut = () => {
        Auth.signOut()
            .then(() => {
                this.props.logOut();
                console.log('signed out');
            })
            .catch(e => {
                console.error(e);
            });
    };
}

export default connect(
    null,
    mapDispatchToProps
)(SignOutButton);
