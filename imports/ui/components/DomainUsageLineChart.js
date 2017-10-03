import React, {Component} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const BAR_COLORS = ['#82d962', '#88c1ff', '#cec3ff', '#fff984', '#ff5261'];

export default class DomainUsageLineChart extends Component {
    getLineData() {
        return this.props.aggregateVisits.map((e) => {
            return {
                date: e.date.toString(),
                timeSpent: e.timeSpent,
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