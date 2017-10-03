import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const BAR_COLORS = ['#01579b', '#0277bd', '#0288d1', '#039be5', '#03a9f4'];

export default class FrequencyBarChart extends Component {
    getBarData() {
        return this.props.aggregateVisits.map((e, index) => {
            return {
                name: e.hostname,
                frequency: e.frequency,
                fill: BAR_COLORS[index]
            };
        });
    }

    render() {
        return (
            <div>
                <ResponsiveContainer height={300}>
                    <BarChart data={this.getBarData()}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Bar dataKey="frequency"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}