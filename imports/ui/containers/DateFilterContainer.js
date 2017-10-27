import React, {Component} from 'react';
import DateFilter from '../components/DateFilter';
import DateUtil from '../utils/DateUtil';

export default class DateFilterContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDateFilter: 'day'
        };
    }

    setCurrentDateFilter(value) {
        let firstDate = new Date();
        switch (value) {
            case 'day':
                firstDate = DateUtil.getToday();
                break;
            case 'week':
                firstDate = DateUtil.getFirstDayOfPastWeek();
                break;
            case 'month':
                firstDate = DateUtil.getFirstDayOfPastMonth();
                break;
            case 'year':
                firstDate = DateUtil.getFirstDayOfPastYear();
                break;
        }
        this.setState({currentDateFilter: value});
        this.props.setSinceDate(firstDate);
    }


    render() {
        return React.createElement(DateFilter, {
            currentDateFilter: this.state.currentDateFilter,
            setCurrentDateFilter: (value) => this.setCurrentDateFilter(value)
        });
    }
}