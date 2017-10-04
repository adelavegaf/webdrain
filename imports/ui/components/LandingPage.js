import React, {Component} from 'react';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <span>Log in to WebDrain</span>
                <Card>
                    <CardText>
                        <div className="row justify-content-center">
                            <TextField type="text"
                                       floatingLabelText="Username"
                                       floatingLabelFixed={true}
                                       errorText={this.props.authenticationError}
                                       value={this.props.username}
                                       onChange={(e) => this.props.onUserNameChange(e.target.value)}/>
                        </div>
                        <div className="row justify-content-center">
                            <TextField type="password"
                                       floatingLabelText="Password"
                                       floatingLabelFixed={true}
                                       errorText={this.props.authenticationError}
                                       value={this.props.password}
                                       onChange={(e) => this.props.onPasswordChange(e.target.value)}/>
                        </div>
                        <div className="row justify-content-center">
                            <RaisedButton label="Log In" secondary={true} onClick={() => this.props.onLogIn()}/>
                        </div>
                    </CardText>
                </Card>
            </div>
        )
    }
}