import React, {Component} from 'react';
import GeneralUsageContainer from '../containers/GeneralUsageContainer';
import DomainUsageLineChartContainer from '../containers/DomainUsageLineChartContainer';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import './Statistics.css';
import GeneralFrequencyContainer from '../containers/GeneralFrequencyContainer';
import ExtensionInformationContainer from '../containers/ExtensionInformationContainer';

export default class Statistics extends Component {

    wrapContainerInCard(title, subtitle, container) {
        return (
            <div className="card-padding">
                <Card initiallyExpanded={true}>
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
            </div>
        );
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    {
                        this.wrapContainerInCard('Extension Information',
                            'Shows the status of our extension',
                            <ExtensionInformationContainer/>)
                    }
                    {
                        this.wrapContainerInCard('Website usage over time',
                            'Shows statistics related to the usage of a particular domain through the past week',
                            <DomainUsageLineChartContainer/>)
                    }
                    {
                        this.wrapContainerInCard('Time spent on websites',
                            'Shows statistics related to the time you have spent on each domain',
                            <GeneralUsageContainer/>)
                    }
                    {
                        this.wrapContainerInCard('Website visit frequency',
                            'Shows statistics related to the number of times you have visited each domain',
                            <GeneralFrequencyContainer/>)
                    }
                </div>
            </div>
        );
    }
}