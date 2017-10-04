import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import DateFilterContainer from '../containers/DateFilterContainer';

const BAR_COLORS = ['#6c6f00', '#cddc39', '#fff64f', '#ffc400', '#c79400'];

const CHART_MARGINS = {top: 10, right: 10, bottom: 10, left: 10};
export default class GeneralUsageBarChart extends Component {
    getBarData() {
        return this.props.totals.map((e, index) => {
            return {
                name: e.hostname,
                time: e.total,
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
                        <Bar dataKey="time" barSize={12}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}