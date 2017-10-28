import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import App from './App.js';
import {AppBar} from 'material-ui';
import StatisticsContainer from '../containers/StatisticsContainer';
import LandingPageContainer from '../containers/LandingPageContainer';

if (Meteor.isClient) {
    describe('App', function () {
        it('should render AppBar', function () {
            const app = shallow(<App currentUser={'user'}/>);
            chai.assert.equal(app.find(AppBar).length, 1);
        });

        it('should render statistics container when current user is defined', function () {
            const app = shallow(<App currentUser={'user'}/>);
            chai.assert.equal(app.find(StatisticsContainer).length, 1);
        });

        it('should not render statistics container when current user is not defined', function () {
            const app = shallow(<App currentUser={null}/>);
            chai.assert.equal(app.find(StatisticsContainer).length, 0);
        });

        it('should render landing page container when current user is not defined', function () {
            const app = shallow(<App currentUser={null}/>);
            chai.assert.equal(app.find(LandingPageContainer).length, 1);
        });

        it('should not render landing page container when current user is defined', function () {
            const app = shallow(<App currentUser={'user'}/>);
            chai.assert.equal(app.find(LandingPageContainer).length, 0);
        });
    });
}

