import React, {Component} from 'react';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

const loginPromptStyle = {
    margin: '5px',
    fontWeight: 300,
    fontSize: '24px',
    textAlign: 'center',
    color: '#737976'
};

const titleStyle = {
    paddingTop: '20px',
    fontWeight: 300,
    fontSize: '22px',
    color: 'rgba(255, 255, 255, 0.94)'
};

const subtitleStyle = {
    paddingBottom: '10px',
    fontWeight: 300,
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.94)'
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

const loginPromptContainerStyle = {
    background: '#009faf'
};

export default class LandingPage extends Component {
    render() {
        return (
            <div className="row justify-content-center" style={loginPromptContainerStyle}>
                <div className="col-12 col-md-6 col-lg-4">
                    <h2 style={titleStyle}>We help you manage your time in the web</h2>
                    <h2 style={subtitleStyle}>Set website usage daily goals and start getting insights today!</h2>
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
                </div>
            </div>
        )
    }
}