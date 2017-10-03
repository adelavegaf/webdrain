import React, {Component} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import AutoComplete from 'material-ui/AutoComplete';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class DomainUsageLineChart extends Component {
    getLineData() {
        return this.props.aggregateVisits.map((e) => {
            return {
                date: WEEK_DAYS[e.date.getDay()],
                timeSpent: e.timeSpent / 1000,
            };
        });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <AutoComplete
                        floatingLabelText="Type the name of the domain"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={this.props.domains}
                        maxSearchResults={5}
                        openOnFocus={true}
                        onUpdateInput={(domain) => this.props.setSelectedDomain(domain)}
                    />
                </div>
                <ResponsiveContainer height={300}>
                    <LineChart data={this.getLineData()}>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Line dataKey="timeSpent"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}