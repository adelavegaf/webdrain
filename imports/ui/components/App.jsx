import React, {Component} from 'react';
import FrequencyBarChartContainer from '../containers/FrequencyBarChartContainer';
import UsagePieChartContainer from '../containers/UsagePieChartContainer';
import AccountsUIWrapper from '../utils/AccountsUIWrapper';

export default class App extends Component {

    render() {
        return (
            <div>
                <AccountsUIWrapper/>
                <UsagePieChartContainer sinceDate={new Date(2015, 1, 1)}/>
                <FrequencyBarChartContainer sinceDate={new Date(2016, 1, 1)}/>
            </div>
        );
    }
}