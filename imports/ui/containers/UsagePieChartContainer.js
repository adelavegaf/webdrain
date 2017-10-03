import React, {Component} from 'react';
import UsagePieChart from '../components/UsagePieChart';
import Api from '../utils/Api';
import DateUtil from '../utils/DateUtil';

export default class UsagePieChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregateVisits: [],
            sinceDate: DateUtil.getFirstDayOfPastWeek()
        }
    }

    setSinceDate(sinceDate) {
        this.setState({sinceDate: sinceDate});
    }

    convertUsageToTopFivePercentages(response) {
        const totalTime = response.reduce((total, cur) => total + cur.total, 0);
        const percentages = response.map((cur) => {
            let percentage = cur.total / totalTime;
            return {hostname: cur._id, percentage: percentage};
        });
        const sortedPercentages = percentages.sort((a, b) => b.percentage - a.percentage);
        const parsedPercentages = sortedPercentages.slice(0, 4);
        let otherPercentage = 0;
        for (let i = 4; i < sortedPercentages.length; i++) {
            otherPercentage += sortedPercentages[i].percentage;
        }
        parsedPercentages.push({hostname: 'Other Domains', percentage: otherPercentage});
        return parsedPercentages;
    }

    componentDidMount() {
        Api.getUsageSince(this.state.sinceDate)
           .then((response) => {
               this.setState({aggregateVisits: this.convertUsageToTopFivePercentages(response)});
           })
           .catch((error) => {
               console.error(error);
           });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sinceDate.getTime() === this.state.sinceDate.getTime()) {
            return;
        }
        Api.getUsageSince(this.state.sinceDate)
           .then((response) => {
               this.setState({aggregateVisits: this.convertUsageToTopFivePercentages(response)});
           })
           .catch((error) => {
               console.error(error);
           });
    }

    render() {
        return React.createElement(UsagePieChart, {
            aggregateVisits: this.state.aggregateVisits,
            setSinceDate: (sinceDate) => this.setSinceDate(sinceDate)
        });
    }
}