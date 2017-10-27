import React, {Component} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import DateFilterContainer from '../containers/DateFilterContainer';

const BAR_COLORS = ['#00bcd4', '#cddc39', '#fff64f', '#ffc400', '#ff197a'];

const CHART_MARGINS = {top: 20, right: 30, bottom: 5, left: 20};
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

    formatTooltipValue(value) {
        return value + 'min';
    }

    render() {
        return (
            <div>
                <ResponsiveContainer height={300}>
                    <BarChart data={this.getBarData()} margin={CHART_MARGINS}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip formatter={this.formatTooltipValue}/>
                        <Bar dataKey="time" barSize={12}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}