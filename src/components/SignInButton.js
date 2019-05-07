import React, { Component } from 'react';
import { isBrowser } from '../utils/auth';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch({ type: `LOG_IN` });
    },
  };
};

class SignInButton extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return <Button variant="primary" onClick={this.signIn}>Sign in</Button>;
  }

  signIn = () => {
    if (!isBrowser) {
      return;
    }
    Auth.federatedSignIn()
      .then(user => {
        this.props.logIn();
        console.log(user);
      })
      .catch(e => console.error(e));
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SignInButton);
