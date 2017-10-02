import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import App from '../components/App.jsx';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(App, {
            currentUser: this.props.currentUser,
        });
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, AppContainer);