import React, {Component} from 'react';

import AccountsUIWrapper from '../utils/AccountsUIWrapper.jsx';
import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';

const PIE_COLORS = ['#82d962', '#88c1ff', '#cec3ff', '#fff984', '#ff5261'];
export default class App extends Component {
    getPieData() {
        return this.props.aggregateVisits.map((e, index) => {
            return {
                name: e.hostname,
                value: Number(parseFloat(e.percentage * 100).toFixed(0)),
                fill: PIE_COLORS[index]
            };
        });
    }

    render() {
        return (
            <div>
                <AccountsUIWrapper/>
                <ResponsiveContainer height={300}>
                    <PieChart>
                        <Pie dataKey="value" data={this.getPieData()}
                             isAnimationActive={true}/>
                        <Tooltip formatter={(val) => val + '%'}/>
                        <Legend verticalAlign="bottom"/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    }
}