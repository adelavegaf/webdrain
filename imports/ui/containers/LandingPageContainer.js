import React, {Component} from 'react';
import LandingPage from '../components/LandingPage';

export default class LandingPageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authenticationErrors: ''
        };
    }

    onUserNameChange(value) {
        this.setState({username: value});
    }

    onPasswordChange(value) {
        this.setState({password: value});
    }

    onLogIn() {
        this.props.onLogIn(this.state.username, this.state.password);
    }

    render() {
        return React.createElement(LandingPage, {
            authenticationError: this.state.authenticationError,
            onUserNameChange: (value) => this.onUserNameChange(value),
            onPasswordChange: (value) => this.onPasswordChange(value),
            onLogIn: () => this.onLogIn()
        });
    }
}
