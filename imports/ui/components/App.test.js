import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import App from './App.js';
import {AppBar, FlatButton} from 'material-ui';

if (Meteor.isClient) {
    describe('App', function () {
        it('should render AppBar', function () {
            const app = shallow(<App onLogOut={() => console.log('bom')} onLogIn={() => console.log('bom')}
                                            onRegister={() => console.log('bom')} currentUser={'user'}/>);
            chai.assert.equal(app.find(AppBar).length, 1);
        });

        it('should render log out button in AppBar when current user is defined', function () {
            const app = shallow(<App onLogOut={() => console.log('bom')} onLogIn={() => console.log('bom')}
                                     onRegister={() => console.log('bom')} currentUser={'user'}/>);
            chai.assert.equal(app.find(FlatButton).length, 1);
        });

        it('should not render log out button in AppBar when current user is not defined', function () {
            const app = shallow(<App onLogOut={() => console.log('bom')} onLogIn={() => console.log('bom')}
                                     onRegister={() => console.log('bom')} currentUser={null}/>);
            chai.assert.equal(app.find(FlatButton).length, 0);
        });
    });
}

