import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class DateFilter extends Component {
    onDateFilterChange(value) {
        this.props.setCurrentDateFilter(value);
    }

    render() {
        return (
            <div className="date-selector">
                <SelectField floatingLabelText="Show results since" value={this.props.currentDateFilter}
                             onChange={(event, index, value) => this.onDateFilterChange(value)}>
                    <MenuItem value="day" primaryText="Today"/>
                    <MenuItem value="week" primaryText="Past Week"/>
                    <MenuItem value="month" primaryText="Past Month"/>
                    <MenuItem value="year" primaryText="Past Year"/>
                </SelectField>
            </div>
        );
    }
}