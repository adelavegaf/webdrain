import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {PieChart, ResponsiveContainer} from 'recharts';
import GeneralUsagePieChart from './GeneralUsagePieChart';

if (Meteor.isClient) {
    describe('GeneralUsagePieChart', function () {
        it('should render a pie chart', function () {
            const pieChart = shallow(React.createElement(GeneralUsagePieChart, {
                percentages: [{hostname: 'example.com', percentage: 1}],
            }));
            chai.assert.equal(pieChart.find(ResponsiveContainer).length, 1);
            chai.assert.equal(pieChart.find(PieChart).length, 1);
        });
    });
}

