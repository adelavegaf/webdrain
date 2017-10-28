import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {BarChart, ResponsiveContainer} from 'recharts';
import GeneralFrequencyBarChart from './GeneralFrequencyBarChart';

if (Meteor.isClient) {
    describe('GeneralFrequencyBarChart', function () {
        it('should render a bar chart', function () {
            const barChart = shallow(React.createElement(GeneralFrequencyBarChart, {
                totals: [{hostname: 'example.com', frequency: 10}],
            }));
            chai.assert.equal(barChart.find(ResponsiveContainer).length, 1);
            chai.assert.equal(barChart.find(BarChart).length, 1);
        });
    });
}

