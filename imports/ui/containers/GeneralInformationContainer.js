import React, {Component} from 'react';
import GeneralInformation from '../components/GeneralInformation';

const EXTENSION_ID = 'ghbfeobhhchaclaoakhcjjcjmnljcmki';

export default class GeneralInformationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionState: {}
        };
    }

    componentDidMount() {
        chrome.runtime.sendMessage(EXTENSION_ID, {checkExtension: true}, (response) => {
            console.log(response);
            if (!response) {
                console.error('extension not found');
            }
        });
    }

    render() {
        return React.createElement(GeneralInformation, {});
    }
}