import React, {Component} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

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