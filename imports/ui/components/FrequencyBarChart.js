import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const BAR_COLORS = ['#82d962', '#88c1ff', '#cec3ff', '#fff984', '#ff5261'];

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