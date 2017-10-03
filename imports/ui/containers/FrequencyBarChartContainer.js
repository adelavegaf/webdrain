import React, {Component} from 'react';
import Api from '../utils/Api';
import FrequencyBarChart from '../components/FrequencyBarChart';
import DateUtil from '../utils/DateUtil';

export default class FrequencyBarChartContainer extends Component {
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
               this.setState({aggregateVisits: this.getTopFiveFrequencies(response)});
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
               this.setState({aggregateVisits: this.getTopFiveFrequencies(response)});
           })
           .catch((error) => {
               console.error(error);
           });
    }

    render() {
        return React.createElement(FrequencyBarChart, {
            aggregateVisits: this.state.aggregateVisits,
            setSinceDate: (sinceDate) => this.setSinceDate(sinceDate)
        });
    }
}