import React, {Component} from 'react';
import Statistics from '../components/Statistics';

export default class StatisticsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return React.createElement(Statistics, {});
    }
}