import {Factory} from 'meteor/dburles:factory';
import React from 'react';
import {shallow} from 'enzyme';
import {chai} from 'meteor/practicalmeteor:chai';
import {Card} from 'material-ui';
import GeneralFrequencyContainer from '../containers/GeneralFrequencyContainer';
import ExtensionInformationContainer from '../containers/ExtensionInformationContainer';
import GeneralUsageContainer from '../containers/GeneralUsageContainer';
import DomainUsageLineChartContainer from '../containers/DomainUsageLineChartContainer';
import Statistics from './Statistics';

if (Meteor.isClient) {
    describe('Statistics', function () {
        it('should render 4 cards', function () {
            const statistics = shallow(React.createElement(Statistics, {}));
            chai.assert.equal(statistics.find(Card).length, 4);
        });

        it('should render an ExtensionInformationContainer', function () {
            const statistics = shallow(React.createElement(Statistics, {}));
            chai.assert.equal(statistics.find(ExtensionInformationContainer).length, 1);
        });

        it('should render a DomainUsageLineChartContainer', function () {
            const statistics = shallow(React.createElement(Statistics, {}));
            chai.assert.equal(statistics.find(DomainUsageLineChartContainer).length, 1);
        });

        it('should render a GeneralUsageContainer', function () {
            const statistics = shallow(React.createElement(Statistics, {}));
            chai.assert.equal(statistics.find(GeneralUsageContainer).length, 1);
        });

        it('should render a GeneralFrequencyContainer', function () {
            const statistics = shallow(React.createElement(Statistics, {}));
            chai.assert.equal(statistics.find(GeneralFrequencyContainer).length, 1);
        });
    });
}

