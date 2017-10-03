import React, {Component} from 'react';
import AccountsUIWrapper from '../utils/AccountsUIWrapper';
import {AppBar} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StatisticsContainer from '../containers/StatisticsContainer';


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#fafafa',
        primary2Color: '#c7c7c7',
        primary3Color: '#ffffff',
        accent1Color: '#01579b',
        accent2Color: '#002f6c',
        accent3Color: '#4f83cc',
        alternateTextColor: '#01579b',
    }
});


export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar title="WEB DRAIN"/>
                    <AccountsUIWrapper/>
                    <StatisticsContainer/>
                </div>
            </MuiThemeProvider>
        );
    }
}