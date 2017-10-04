import React, {Component} from 'react';
import Api from '../utils/Api';
import DateUtil from '../utils/DateUtil';
import GeneralFrequency from '../components/GeneralFrequency';

export default class GeneralFrequencyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percentages: [],
            totals: [],
            selectedIndex: 0,
            sinceDate: DateUtil.getFirstDayOfPastWeek()
        }
    }

    setSinceDate(sinceDate) {
        this.setState({sinceDate: sinceDate});
    }

    setSelectedIndex(index) {
        this.setState({selectedIndex: index});
    }

    getTopFivePercentages(response) {
        const totalFrequency = response.reduce((total, cur) => total + cur.total, 0);
        const sortedResponse = response.sort((a, b) => b.total - a.total);
        const percentages = sortedResponse.slice(0, 4);
        const otherDomainsFrequency = totalFrequency - percentages.reduce((total, cur) => total + cur.total, 0);
        percentages.push({'_id': 'Other Domains', 'total': otherDomainsFrequency});
        console.log(percentages);
        return percentages.map(e => {
            return {
                hostname: e._id,
                percentage: e.total / totalFrequency
            }
        });
    }

    getTopFiveFrequencies(response) {
        return response.sort((a, b) => b.total - a.total)
                       .slice(0, 5)
                       .map(e => {
                           return {
                               hostname: e._id,
                               frequency: e.total
                           };
                       });
    }

    componentDidMount() {
        Api.getFrequencySince(this.state.sinceDate)
           .then((response) => {
               this.setState({
                   percentages: this.getTopFivePercentages(response),
                   totals: this.getTopFiveFrequencies(response)
               });
           })
           .catch((error) => {
               console.error(error);
           });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sinceDate.getTime() === this.state.sinceDate.getTime()) {
            return;
        }
        Api.getFrequencySince(this.state.sinceDate)
           .then((response) => {
               this.setState({
                   percentages: this.getTopFivePercentages(response),
                   totals: this.getTopFiveFrequencies(response)
               });
           })
           .catch((error) => {
               console.error(error);
           });
    }

    render() {
        return React.createElement(GeneralFrequency, {
            percentages: this.state.percentages,
            totals: this.state.totals,
            selectedIndex: this.state.selectedIndex,
            onSelectedIndexChange: (index) => this.setSelectedIndex(index),
            onSinceDateChange: (date) => this.setSinceDate(date)
        });
    }
}