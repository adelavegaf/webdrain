import React, {Component} from 'react';
import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';

const PIE_COLORS = ['#82d962', '#88c1ff', '#cec3ff', '#fff984', '#ff5261'];

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
            </div>
        );
    }
}