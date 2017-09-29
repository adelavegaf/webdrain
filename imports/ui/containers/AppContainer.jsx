import React, {Component} from 'react';

import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import App from '../components/App.jsx';
import Visits from '../../api/visits';

class AppContainer extends Component {
    render() {
        return React.createElement(App, {currentUser: this.props.currentUser, visits: this.props.visits});
    }
}

export default createContainer(() => {
    Meteor.subscribe('visits');
    return {
        currentUser: Meteor.user(),
        visits: Visits.find().fetch(),
    };
}, AppContainer);