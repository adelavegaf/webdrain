import React, {Component} from 'react';
import Api from '../utils/Api';
import DomainUsageLineChart from '../components/DomainUsageLineChart';
import DateUtil from '../utils/DateUtil';

export default class DomainUsageLineChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregateVisits: [],
            sinceDate: DateUtil.getFirstDayOfPastWeek()
        }
    }

    getWeeklyDomainUsageResults(response) {
        const weeklyUsage = DateUtil.getLastWeekArray();

        response.forEach(usageInDate => {
            const dateInfo = usageInDate._id;
            const date = new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day);
            weeklyUsage.find((val) => val.date.getTime() === date.getTime()).timeSpent = usageInDate.total;
        });

        return weeklyUsage;
    }

    componentDidMount() {
        Api.getDomainUsageSince('localhost', this.state.sinceDate)
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