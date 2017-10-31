import React, {Component} from 'react';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

const loginPromptStyle = {
    margin: '5px',
    fontWeight: 300,
    fontSize: '24px',
    textAlign: 'center',
    color: '#737976'
};

const buttonContainer = {
    marginRight: '5px',
    marginLeft: '5px'
};

const textFieldContainer = {
    margin: '20px'
};

const labelButtonStyle = {
    color: '#000000',
    fontWeight: 300
};

const buttonsContainer = {
    paddingTop: '20px'
};

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardText>
                        <div style={loginPromptStyle}>
                            Welcome
                        </div>
                        <div className="row justify-content-center" style={textFieldContainer}>
                            <TextField type="text"
                                       floatingLabelText="Username"
                                       floatingLabelFixed={true}
                                       errorText={this.props.authenticationError}
                                       value={this.props.username}
                                       onChange={(e) => this.props.onUserNameChange(e.target.value)}/>
                        </div>
                        <div className="row justify-content-center" style={textFieldContainer}>
                            <TextField type="password"
                                       floatingLabelText="Password"
                                       floatingLabelFixed={true}
                                       errorText={this.props.authenticationError}
                                       value={this.props.password}
                                       onChange={(e) => this.props.onPasswordChange(e.target.value)}/>
                        </div>
                        <div className="row justify-content-center" style={buttonsContainer}>
                            <div style={buttonContainer}>
                                <RaisedButton label="Log In"
                                              secondary={true}
                                              labelStyle={labelButtonStyle}
                                              onClick={() => this.props.onLogIn()}/>
                            </div>
                            <div style={buttonContainer}>
                                <RaisedButton label="Register"
                                              secondary={true}
                                              labelStyle={labelButtonStyle}
                                              onClick={() => this.props.onRegister()}/>
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
        )
    }
}