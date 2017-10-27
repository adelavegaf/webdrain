import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import '../imports/startup/accounts-config.js';
import AppContainer from '../imports/ui/containers/AppContainer.js';

Meteor.startup(() => {
    render(<AppContainer/>, document.getElementById('render-target'));
});