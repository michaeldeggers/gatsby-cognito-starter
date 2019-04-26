import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import Login from '../components/Login';
import { Auth } from 'aws-amplify';
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

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticating: true,
        };
    }

    componentDidMount = async () => {
        try {
            await Auth.currentSession();
            props.logIn();
        } catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    };

    render() {
        return (
            !this.state.isAuthenticating && (
                <Layout props={childProps}>
                    <Router>
                        <PrivateRoute
                            path="/app/profile"
                            component={Profile}
                        />
                        <Login path="/app/login" />
                    </Router>
                </Layout>
            )
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
