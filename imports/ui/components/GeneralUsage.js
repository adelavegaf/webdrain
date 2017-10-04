import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem, FontIcon, Paper} from 'material-ui';
import GeneralUsagePieChart from './GeneralUsagePieChart';
import DateFilterContainer from '../containers/DateFilterContainer';
import GeneralUsageBarChart from './GeneralUsageBarChart';
import './GeneralUsage.css';

const barIcon = <FontIcon className="material-icons">insert_chart</FontIcon>;
const pieIcon = <FontIcon className="material-icons">pie_chart</FontIcon>;

const BAR_CHART_INDEX = 0;
const PIE_CHART_INDEX = 1;

export default class GeneralUsage extends Component {

    chooseChart() {
        if (this.props.totals.length === 0) {
            return (
                <div className="error-message">
                    <div>We currently don't possess information to provide you with these statistics</div>
                    <div>Make sure you have our extension installed and enabled</div>
                </div>
            );
        }
        switch (this.props.selectedIndex) {
            case BAR_CHART_INDEX:
                return <GeneralUsageBarChart totals={this.props.totals}/>;
            case PIE_CHART_INDEX:
                return <GeneralUsagePieChart percentages={this.props.percentages}/>;
        }
    }

    render() {
        return (
            <div>
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.props.selectedIndex}>
                        <BottomNavigationItem
                            label="Totals"
                            icon={barIcon}
                            onClick={() => this.props.onSelectedIndexChange(0)}
                        />
                        <BottomNavigationItem
                            label="Percentages"
                            icon={pieIcon}
                            onClick={() => this.props.onSelectedIndexChange(1)}
                        />
                    </BottomNavigation>
                </Paper>
                {
                    this.chooseChart()
                }
                <div className="row justify-content-center">
                    <DateFilterContainer setSinceDate={(date) => this.props.onSinceDateChange(date)}/>
                </div>
            </div>
        );
    }
}