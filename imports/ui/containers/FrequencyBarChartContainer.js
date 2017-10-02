import React, {Component} from 'react';
import Api from '../utils/Api';
import FrequencyBarChart from '../components/FrequencyBarChart';

export default class FrequencyBarChartContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregateVisits: []
        }
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
        Api.getFrequencySince(this.props.sinceDate)
           .then((response) => {
               this.setState({aggregateVisits: this.getTopFiveFrequencies(response)});
           })
           .catch((error) => {
               console.error(error);
           });
    }

    render() {
        return React.createElement(FrequencyBarChart, {
            aggregateVisits: this.state.aggregateVisits
        });
    }
}