import React from 'react';
import { Link } from 'gatsby';
import SignOutButton from './SignOutButton';
import { connect } from 'react-redux';

const mapStateToProps = ({ loggedIn }) => {
    return { loggedIn };
};

const NavBar = ({ loggedIn }) => {
    const content = { message: '', login: true };
    if (loggedIn) {
        content.message = `Hello, User`;
    } else {
        content.message = 'You are not logged in';
    }
    return (
        <div
            style={{
                display: 'flex',
                flex: '1',
                justifyContent: 'space-between',
                borderBottom: '1px solid #d1c1e0',
            }}
        >
            <span>{content.message}</span>

            <nav>
                <Link to="/">Home</Link>
                {` `}
                <Link to="/app/profile">Profile</Link>
                {` `}
                {loggedIn ? <SignOutButton /> : null}
            </nav>
        </div>
    );
};

export default connect(mapStateToProps)(NavBar);
