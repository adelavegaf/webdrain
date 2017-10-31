import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import App from '../components/App.js';

const GENERIC_AUTH_ERROR_MSG = 'Incorrect username or password';
const USERNAME_TAKEN_MSG = 'This username is unavailable at the moment';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticationError: ''
        };
    }

    onRegister(username, password) {
        if (!this.checkAuthenticationFields(username, password)) {
            return;
        }

        Accounts.createUser({username: username, password: password}, (error) => {
            if (error) {
                this.setState({authenticationError: USERNAME_TAKEN_MSG});
            }
        });
    }

    onLogIn(username, password) {
        if (!this.checkAuthenticationFields(username, password)) {
            return;
        }

        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                this.setState({authenticationError: GENERIC_AUTH_ERROR_MSG});
            }
        });
    }

    checkAuthenticationFields(username, password) {
        if (username.length === 0 || password.length === 0) {
            this.setState({authenticationError: GENERIC_AUTH_ERROR_MSG});
            return false;
        }
        return true;
    }

    onLogOut() {
        Meteor.logout();
    }

    render() {
        return React.createElement(App, {
            currentUser: this.props.currentUser,
            authenticationError: this.state.authenticationError,
            onRegister: (username, password) => this.onRegister(username, password),
            onLogIn: (username, password) => this.onLogIn(username, password),
            onLogOut: () => this.onLogOut()
        });
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, AppContainer);