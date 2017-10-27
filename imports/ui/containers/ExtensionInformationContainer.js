import React, {Component} from 'react';
import GeneralInformation from '../components/ExtensionInformation';

const EXTENSION_ID = 'llepmjjmpmpcheageoaclebkfpbegmbk';

export default class ExtensionInformationContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingState: true,
            installed: false,
            authenticated: false,
        };
    }

    componentDidMount() {
        chrome.runtime.sendMessage(EXTENSION_ID, {checkExtension: true}, (response) => {
            if (!response) {
                this.setState({loadingState: false});
                return;
            }
            this.setState({
                installed: true,
                authenticated: response.authenticated,
                loadingState: false
            });
        });
    }

    render() {
        return React.createElement(GeneralInformation, {
            loadingState: this.state.loadingState,
            installed: this.state.installed,
            authenticated: this.state.authenticated,
        });
    }
}