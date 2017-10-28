import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {BottomNavigation, BottomNavigationItem} from 'material-ui';
import GeneralUsagePieChart from './GeneralUsagePieChart';
import DateFilterContainer from '../containers/DateFilterContainer';
import GeneralUsageBarChart from './GeneralUsageBarChart';
import GeneralUsage from './GeneralUsage';

if (Meteor.isClient) {
    describe('GeneralUsage', function () {
        it('should render navigation', function () {
            const generalFrequency = shallow(React.createElement(GeneralUsage, {
                percentages: [],
                totals: [],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(BottomNavigation).length, 1);
        });

        it('should render 2 navigation items', function () {
            const generalFrequency = shallow(React.createElement(GeneralUsage, {
                percentages: [],
                totals: [],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(BottomNavigationItem).length, 2);
        });

        it('should render a DateFilterContainer', function () {
            const generalFrequency = shallow(React.createElement(GeneralUsage, {
                percentages: [],
                totals: [],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(DateFilterContainer).length, 1);
        });

        it('should render a general usage bar chart', function () {
            const generalFrequency = shallow(React.createElement(GeneralUsage, {
                percentages: [{}, {}],
                totals: [{}, {}],
                selectedIndex: 0,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(GeneralUsageBarChart).length, 1);
        });

        it('should render a general usage pie chart', function () {
            const generalFrequency = shallow(React.createElement(GeneralUsage, {
                percentages: [{}, {}],
                totals: [{}, {}],
                selectedIndex: 1,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(GeneralUsagePieChart).length, 1);
        });

        it('should render an error message with no charts', function () {
            const generalFrequency = shallow(React.createElement(GeneralUsage, {
                percentages: [],
                totals: [],
                selectedIndex: 1,
                onSelectedIndexChange: () => true,
                onSinceDateChange: () => true
            }));
            chai.assert.equal(generalFrequency.find(GeneralUsageBarChart).length, 0);
            chai.assert.equal(generalFrequency.find(GeneralUsagePieChart).length, 0);
        });
    });
}

