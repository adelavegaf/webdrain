import React, {Component} from 'react';

import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import App from '../components/App.jsx';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aggregateVisits: []
        }
    }

    componentDidMount() {
        Meteor.call('visits.timeSpentSince', 0, (error, response) => {
            const totalTime = response.reduce((total, cur) => total + cur.total, 0);
            const percentages = response.map((cur) => {
                let percentage = cur.total/totalTime;
                return {hostname: cur._id, percentage: percentage};
            });
            const sortedPercentages = percentages.sort((a, b) => b.percentage - a.percentage);
            const parsedPercentages = sortedPercentages.slice(0, 4);
            let otherPercentage = 0;
            for (let i = 4; i < sortedPercentages.length; i++) {
                otherPercentage += sortedPercentages[i].percentage;
            }
            parsedPercentages.push({ hostname: 'Other Domains', percentage: otherPercentage});
            console.log(parsedPercentages);
            this.setState({aggregateVisits: parsedPercentages});
        });
    }

    render() {
        return React.createElement(App, {
            currentUser: this.props.currentUser,
            aggregateVisits: this.state.aggregateVisits
        });
    }
}

export default createContainer(() => {
    Meteor.subscribe('visits');
    return {
        currentUser: Meteor.user(),
    };
}, AppContainer);