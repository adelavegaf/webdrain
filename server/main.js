import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';
import '../imports/api/visits.js';
import '../imports/api/goals.js';

Meteor.startup(() => {
    WebApp.addHtmlAttributeHook(() => {
        return {
            'lang': 'en'
        };
    })
});
