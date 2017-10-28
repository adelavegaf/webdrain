import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {AutoComplete} from 'material-ui';
import {LineChart, ResponsiveContainer} from 'recharts';
import DomainUsageLineChart from './DomainUsageLineChart';

if (Meteor.isClient) {
    const aggregatedData = [{date: new Date(), timeSpent: 100}];
    describe('DomainUsageLineChart', function () {
        it('should render an autocomplete input field when aggregated data is present', function () {
            const lineChart = shallow(React.createElement(DomainUsageLineChart, {
                domains: [],
                aggregateVisits: aggregatedData,
                setSelectedDomain: () => true
            }));
            chai.assert.equal(lineChart.find(AutoComplete).length, 1);
        });

        it('should render an autocomplete input field when aggregated data is not present', function () {
            const lineChart = shallow(React.createElement(DomainUsageLineChart, {
                domains: [],
                aggregateVisits: [],
                setSelectedDomain: () => true
            }));
            chai.assert.equal(lineChart.find(AutoComplete).length, 1);
        });

        it('should render a line chart when data is present', function () {
            const lineChart = shallow(React.createElement(DomainUsageLineChart, {
                domains: [],
                aggregateVisits: aggregatedData,
                setSelectedDomain: () => true
            }));
            chai.assert.equal(lineChart.find(ResponsiveContainer).length, 1);
            chai.assert.equal(lineChart.find(LineChart).length, 1);
        });

        it('should not render a line chart when no data is present', function () {
            const lineChart = shallow(React.createElement(DomainUsageLineChart, {
                domains: [],
                aggregateVisits: [],
                setSelectedDomain: () => true
            }));
            chai.assert.equal(lineChart.find(ResponsiveContainer).length, 0);
            chai.assert.equal(lineChart.find(LineChart).length, 0);
        });
    });
}

