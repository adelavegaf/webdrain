import React, {Component} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import AutoComplete from 'material-ui/AutoComplete';
import {debounce} from 'lodash';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default class DomainUsageLineChart extends Component {
    constructor(props) {
        super(props);
        this.onSearchUpdate = debounce(this.props.setSelectedDomain, 1000);
    }

    getLineData() {
        return this.props.aggregateVisits.map((e) => {
            return {
                date: WEEK_DAYS[e.date.getDay()],
                time: Number(parseFloat(e.timeSpent / 60000).toFixed(0)),
            };
        });
    }

    formatTooltipValue(value) {
        return value + 'min';
    }

    getLineChart() {
        return (
            <ResponsiveContainer height={300}>
                <LineChart data={this.getLineData()}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip formatter={this.formatTooltipValue}/>
                    <Line dataKey="time"/>
                </LineChart>
            </ResponsiveContainer>
        );
    }

    getNoDataMessage() {
        return (
            <div/>
        )
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <AutoComplete
                        floatingLabelText="Type the name of the domain"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={this.props.domains}
                        maxSearchResults={5}
                        openOnFocus={true}
                        onUpdateInput={(domain) => this.onSearchUpdate(domain)}
                    />
                </div>
                {
                    this.props.aggregateVisits.length === 0 ? this.getNoDataMessage() : this.getLineChart()
                }
            </div>
        );
    }
}