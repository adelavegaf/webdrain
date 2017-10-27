import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import App from '../components/App.js';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    onRegister(username, password) {
        Accounts.createUser({
            username: username,
            password: password
        });
    }

    onLogIn(username, password) {
        Meteor.loginWithPassword(username, password);
    }

    onLogOut() {
        Meteor.logout();
    }

    render() {
        return React.createElement(App, {
            currentUser: this.props.currentUser,
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