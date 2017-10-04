import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import DateFilterContainer from '../containers/DateFilterContainer';

const BAR_COLORS = ['#6c6f00', '#cddc39', '#fff64f', '#ffc400', '#c79400'];

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
                <div className="row justify-content-center">
                    <DateFilterContainer setSinceDate={(date) => this.props.setSinceDate(date)}/>
                </div>
            </div>
        );
    }
}