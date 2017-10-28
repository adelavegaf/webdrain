import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {BottomNavigation, BottomNavigationItem} from 'material-ui';
import GeneralFrequencyPieChart from './GeneralFrequencyPieChart';
import DateFilterContainer from '../containers/DateFilterContainer';
import GeneralFrequencyBarChart from './GeneralFrequencyBarChart';
import GeneralFrequency from './GeneralFrequency';

if (Meteor.isClient) {
    describe('GeneralFrequency', function () {
        it('should render navigation', function () {
            const generalFrequency = shallow(React.createElement(GeneralFrequency, {
                percentages: [],
                totals: [],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(BottomNavigation).length, 1);
        });

        it('should render 2 navigation items', function () {
            const generalFrequency = shallow(React.createElement(GeneralFrequency, {
                percentages: [],
                totals: [],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(BottomNavigationItem).length, 2);
        });

        it('should render a DateFilterContainer', function () {
            const generalFrequency = shallow(React.createElement(GeneralFrequency, {
                percentages: [],
                totals: [],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(DateFilterContainer).length, 1);
        });

        it('should render a general frequency bar chart', function () {
            const generalFrequency = shallow(React.createElement(GeneralFrequency, {
                percentages: [{}, {}],
                totals: [{}, {}],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(GeneralFrequencyBarChart).length, 1);
        });

        it('should render a general frequency pie chart', function () {
            const generalFrequency = shallow(React.createElement(GeneralFrequency, {
                percentages: [{}, {}],
                totals: [{}, {}],
                selectedIndex: 1,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(GeneralFrequencyPieChart).length, 1);
        });

        it('should render an error message with no charts', function () {
            const generalFrequency = shallow(React.createElement(GeneralFrequency, {
                percentages: [],
                totals: [],
                selectedIndex: 1,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(GeneralFrequencyBarChart).length, 0);
            chai.assert.equal(generalFrequency.find(GeneralFrequencyPieChart).length, 0);
        });
    });
}

