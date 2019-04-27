import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { getCurrentAuthenticatedUser } from '../utils/auth';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import { connect } from 'react-redux';

const mapStateToProps = ({ loggedIn }) => {
  return { loggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch({ type: `LOG_IN` });
    },
    logOut: () => {
      dispatch({ type: `LOG_OUT` });
    },
  };
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: 'loading',
      authData: null,
      authError: null,
    };
  }

  componentDidMount() {
    getCurrentAuthenticatedUser()
      .then(user => {
        // TODO: add user to state
        if (!this.props.loggedIn) this.props.logIn();
        this.setState({ authState: 'signedIn' });
        navigate('/app/profile');
      })
      .catch(e => {
        console.log(e);
        this.setState({ authState: 'signIn' });
      });
  }

  render() {
    const { authState } = this.state;
    return (
      <div className="App">
        {authState === 'loading' && <div>loading...</div>}
        {authState === 'signIn' && <SignInButton />}
        {authState === 'signedIn' && <SignOutButton />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
