import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {Step, Stepper} from 'material-ui/Stepper';
import ExtensionInformation from './ExtensionInformation';

if (Meteor.isClient) {
    describe('ExtensionInformation', function () {
        it('should render a stepper', function () {
            const extensionInformation = shallow(React.createElement(ExtensionInformation, {
                authenticated: true,
                installed: true,
            }));
            chai.assert.equal(extensionInformation.find(Stepper).length, 1);
        });

        it('should render 3 steps', function () {
            const extensionInformation = shallow(React.createElement(ExtensionInformation, {
                authenticated: true,
                installed: true,
            }));
            chai.assert.equal(extensionInformation.find(Step).length, 3);
        });
    });
}

