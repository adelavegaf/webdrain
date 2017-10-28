import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import DateFilter from './DateFilter.js';

describe('DateFilter', () => {
    it('should render', () => {
        const dateFilter = shallow(<DateFilter currentDateFilter={'day'} setCurrentDateFilter={() => console.log()}/>);
        chai.assert(dateFilter.hasClass('date-selector'));

    });
});
