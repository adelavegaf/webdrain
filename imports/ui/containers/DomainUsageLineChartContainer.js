import React, {Component} from 'react';
import Api from '../utils/Api';
import DomainUsageLineChart from '../components/DomainUsageLineChart';

export default class DomainUsageLineChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregateVisits: []
        }
    }

    getWeeklyDomainUsageResults(response) {
        const weeklyUsage = [];

        for (let i = 0; i < 8; i++) {
            const date = new Date();
            date.setDate(date.getDate() - 7 + i);
            date.setHours(0, 0, 0, 0);
            weeklyUsage.push({date: date, timeSpent: 0});
        }

        response.forEach(usageInDate => {
            const dateInfo = usageInDate._id;
            const date = new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day);
            console.log(weeklyUsage, date);
            weeklyUsage.find((val) => val.date.getTime() === date.getTime()).timeSpent = usageInDate.total;
        });

        return weeklyUsage;
    }

    componentDidMount() {
        Api.getDomainUsageSince('localhost', this.props.sinceDate)
           .then((response) => {
               this.setState({aggregateVisits: this.getWeeklyDomainUsageResults(response)});
           })
           .catch((error) => {
               console.error(error);
           });
    }

    render() {
        return React.createElement(DomainUsageLineChart, {
            aggregateVisits: this.state.aggregateVisits
        });
    }
}