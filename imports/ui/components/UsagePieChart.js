import React, {Component} from 'react';
import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';
import DateFilterContainer from '../containers/DateFilterContainer';

const PIE_COLORS = ['#01579b', '#0277bd', '#0288d1', '#039be5', '#03a9f4'];

export default class UsagePieChart extends Component {
    getPieData() {
        return this.props.aggregateVisits.map((e, index) => {
            return {
                name: e.hostname,
                value: Number(parseFloat(e.percentage * 100).toFixed(0)),
                fill: PIE_COLORS[index]
            };
        });
    }

    formatTooltipValue(value) {
        return value + '%';
    }

    render() {
        return (
            <div>
                <ResponsiveContainer height={300}>
                    <PieChart>
                        <Pie dataKey="value" data={this.getPieData()}
                             isAnimationActive={true}/>
                        <Tooltip formatter={this.formatTooltipValue}/>
                        <Legend verticalAlign="bottom"/>
                    </PieChart>
                </ResponsiveContainer>
                <div className="row justify-content-center">
                    <DateFilterContainer setSinceDate={(date) => this.props.setSinceDate(date)}/>
                </div>
            </div>
        );
    }
}