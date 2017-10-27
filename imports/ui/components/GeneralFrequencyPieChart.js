import React, {Component} from 'react';
import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';

const PIE_COLORS = ['#00bcd4', '#cddc39', '#fff64f', '#ffc400', '#ff197a'];

export default class GeneralFrequencyPieChart extends Component {
    getPieData() {
        return this.props.percentages.map((e, index) => {
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
                        <Pie dataKey="value"
                             data={this.getPieData()}
                             isAnimationActive={true}
                             innerRadius={60}
                             outerRadius={80}
                        />
                        <Tooltip formatter={this.formatTooltipValue}/>
                        <Legend verticalAlign="bottom"/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}