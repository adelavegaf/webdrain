//Aunque no lo entienda completamente me parece muy interesante que la mayoria de los componentes sean .js y no .jsx (que sublime no lea el formato .jsx me molesta mucho) y que puedas llamar simplemente al metodo React.createElement para crear cualquier componente. 
//La aplicacion no me quizo compilar localmente y no pude registrarme en el demo asi que no puedo opinar sobre el diseño o la funcionalidad :(
//Como siempre un codigo muy facil de leer pero me causa curiosidad saber como funciona toda la aplicacion, como se comunica con la otra y como guarda los registros de las paginas que se visitan

import React, {Component} from 'react';
import {AppBar, FlatButton} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StatisticsContainer from '../containers/StatisticsContainer';
import LandingPageContainer from '../containers/LandingPageContainer';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#00bbd4',
        primary2Color: '#62eeff',
        primary3Color: '#008ba2',
        accent1Color: '#ffc400',
        accent2Color: '#fff64f',
        accent3Color: '#c79400',
    }
});

const titleStyle = {
    'fontWeight': 300,
    'fontSize': '32px'
};

export default class App extends Component {

    getLogOutButton() {
        return (
            <FlatButton label="Logout" onClick={() => this.props.onLogOut()}/>
        );
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar title="WEB DRAIN" titleStyle={titleStyle}
                            showMenuIconButton={false}
                            iconElementRight={this.props.currentUser ? this.getLogOutButton() : <div></div>}/>
                    {
                        this.props.currentUser ? <StatisticsContainer/> :
                        <LandingPageContainer onLogIn={(username, password) => this.props.onLogIn(username, password)}
                                              onRegister={(username, password) => this.props.onRegister(username,
                                                  password)}/>
                    }
                </div>
            </MuiThemeProvider>
        );
    }
}
