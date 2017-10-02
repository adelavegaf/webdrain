import React, {Component} from 'react';
import FrequencyBarChartContainer from '../containers/FrequencyBarChartContainer';
import UsagePieChartContainer from '../containers/UsagePieChartContainer';
import AccountsUIWrapper from '../utils/AccountsUIWrapper';

export default class App extends Component {

    render() {
        return (
            <div>
                <AccountsUIWrapper/>
                <UsagePieChartContainer sinceTimestamp={0}/>
                <FrequencyBarChartContainer sinceTimestamp={0}/>
            </div>
        );
    }
}