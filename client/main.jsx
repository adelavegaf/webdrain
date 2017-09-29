import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import '../imports/startup/accounts-config.js';
import AppContainer from '../imports/ui/containers/AppContainer.jsx';

Meteor.startup(() => {
    render(<AppContainer/>, document.getElementById('render-target'));
});