import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {BarChart, ResponsiveContainer} from 'recharts';
import GeneralUsageBarChart from './GeneralUsageBarChart';

if (Meteor.isClient) {
    describe('GeneralUsageBarChart', function () {
        it('should render a bar chart', function () {
            const barChart = shallow(React.createElement(GeneralUsageBarChart, {
                totals: [{hostname: 'example.com', total: 10}],
            }));
            chai.assert.equal(barChart.find(ResponsiveContainer).length, 1);
            chai.assert.equal(barChart.find(BarChart).length, 1);
        });
    });
}

