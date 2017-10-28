import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import DateFilter from './DateFilter.js';
import MenuItem from 'material-ui/MenuItem';

describe('DateFilter', () => {
    it('should render top level div', () => {
        const dateFilter = shallow(<DateFilter currentDateFilter={'day'} setCurrentDateFilter={() => console.log()}/>);
        chai.assert(dateFilter.hasClass('date-selector'));
    });

    it('should render 4 menu items', () => {
        const dateFilter = shallow(<DateFilter currentDateFilter={'day'} setCurrentDateFilter={() => console.log()}/>);
        chai.assert.equal(dateFilter.find(MenuItem).length, 4);
    });
});
