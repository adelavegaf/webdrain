import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {PieChart, ResponsiveContainer} from 'recharts';
import GeneralFrequencyPieChart from './GeneralFrequencyPieChart';

if (Meteor.isClient) {
    describe('GeneralFrequencyPieChart', function () {
        it('should render a pie chart', function () {
            const pieChart = shallow(React.createElement(GeneralFrequencyPieChart, {
                percentages: [{hostname: 'example.com', percentage: 1}],
            }));
            chai.assert.equal(pieChart.find(ResponsiveContainer).length, 1);
            chai.assert.equal(pieChart.find(PieChart).length, 1);
        });
    });
}

