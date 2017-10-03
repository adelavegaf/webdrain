import React, {Component} from 'react';
import FrequencyBarChartContainer from '../containers/FrequencyBarChartContainer';
import UsagePieChartContainer from '../containers/UsagePieChartContainer';
import DomainUsageLineChartContainer from '../containers/DomainUsageLineChartContainer';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export default class Statistics extends Component {

    wrapContainerInCard(title, subtitle, container) {
        return (
            <Card>
                <CardHeader
                    title={title}
                    subtitle={subtitle}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    {container}
                </CardText>
            </Card>
        );
    }

    render() {
        return (
            <div>
                {
                    this.wrapContainerInCard('Time spent on websites',
                        'Ratio between time spent on website and total time spent on the web',
                        <UsagePieChartContainer sinceDate={new Date(2015, 1, 1)}/>)
                }
                {
                    this.wrapContainerInCard('Website visit frequency',
                        'Top five websites you have visited frequently',
                        <FrequencyBarChartContainer sinceDate={new Date(2015, 1, 1)}/>)
                }
                {
                    this.wrapContainerInCard('Time spent on a domain',
                        'Shows how your usage of a particular domain has changed through the past week.',
                        <DomainUsageLineChartContainer sinceDate={new Date(2015, 1, 1)}/>)
                }
            </div>
        );
    }
}