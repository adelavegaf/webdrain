import React, {Component} from 'react';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

const loginPromptStyle = {
    margin: '5px',
    fontWeight: 300,
    fontSize: '24px',
    textAlign: 'center',
    color: '#737976'
};

const loginContainer = {
    top: '160px'
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
    backgroundColor: '#007887',
    height: '400px',
    backgroundImage: 'url(./pattern.svg)'
};

const headersContainer = {
    marginTop: '20px',
    marginBottom: '20px'
};

const mainHeader = {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 300,
    fontSize: '60px',
    paddingBottom: '35px'
};

const subHeader = {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 300,
    fontSize: '24px',
    paddingBottom: '35px'
};

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <div className="row justify-content-center" style={loginPromptContainerStyle}>
                    <div className="row justify-content-center" style={headersContainer}>
                        <h1 className="col-12" style={mainHeader}>Manage your time in the web</h1>
                        <h2 className="col-12" style={subHeader}>Set website usage daily goals and start getting insights today!</h2>
                    </div>
                    <div className="col-10 col-md-6 col-lg-4">
                        <div/>
                        <div style={loginContainer}>
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
            </div>
        )
    }
}