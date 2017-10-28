import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import DateFilter from './DateFilter.js';
import MenuItem from 'material-ui/MenuItem';

if (Meteor.isClient) {
    describe('DateFilter', function () {
        it('should render top level div', function () {
            const dateFilter = shallow(<DateFilter currentDateFilter={'day'}
                                                   setCurrentDateFilter={() => console.log()}/>);
            chai.assert(dateFilter.hasClass('date-selector'));
        });

        it('should render 4 menu items', function () {
            const dateFilter = shallow(<DateFilter currentDateFilter={'day'}
                                                   setCurrentDateFilter={() => console.log()}/>);
            chai.assert.equal(dateFilter.find(MenuItem).length, 4);
        });
    });
}

