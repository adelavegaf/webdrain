import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import App from '../components/App.jsx';

class AppContainer extends Component {
    constructor(props) {
        super(props);
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