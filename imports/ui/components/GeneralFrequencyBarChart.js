import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const BAR_COLORS = ['#6c6f00', '#cddc39', '#fff64f', '#ffc400', '#c79400'];

export default class GeneralFrequencyBarChart extends Component {
    getBarData() {
        return this.props.totals.map((e, index) => {
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
                    <BarChart data={this.getBarData()} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Bar dataKey="frequency" barSize={12}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}