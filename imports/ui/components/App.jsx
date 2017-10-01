import React, {Component} from 'react';

import AccountsUIWrapper from '../utils/AccountsUIWrapper.jsx';
import {Pie, PieChart, Tooltip} from 'recharts';

export default class App extends Component {
    getPieData() {
        const data = this.props.aggregateVisits.map(e => {
            return {
                name: e.hostname,
                value: Number(parseFloat(e.percentage * 100).toFixed(0))
            };
        });
        console.log(data);
        return data;
    }

    render() {
        return (
            <div>
                <AccountsUIWrapper/>
                <PieChart width={730} height={250}>
                    <Pie data={this.getPieData()} cx="50%" cy="50%" outerRadius={50} fill="#8884d8" isAnimationActive={true}/>
                    <Tooltip/>
                </PieChart>
            </div>
        );
    }
}