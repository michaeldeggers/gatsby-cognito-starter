import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/button';

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch({ type: `LOG_OUT` });
    },
  };
};

class SignOutButton extends Component {
  render() {
    return <Button variant="dark" onClick={this.signOut}>Sign out</Button>;
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
