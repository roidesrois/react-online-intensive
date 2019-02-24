 // Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';
import StatusBar from 'components/StatusBar';

// Instruments
import avatar from 'theme/assets/lisa';


@hot(module)
export default class App extends Component {
    state = {
        login: false,
        avatar,
        currentUserFirstName: 'Прохор',
        currentUserLastName: 'Зимон',
    };

    componentDidMount (){
        const login = window.localStorage.getItem('react_login');

        if( login ) {
            this._handlerLogin(login);
        }


    }

    _handlerLogin = ( login ) => {
        this.setState({
            login: login
        })
    };

    render() {
        return (
            <Catcher>
                <Provider value={ {...this.state, ...{_handlerLogin: this._handlerLogin}} }>
                    { this.state.login && (<StatusBar/>) }
                    <Switch>
                        { this.state.login && (<Route component = { Feed } path = '/feed'/> ) }
                        { this.state.login && (<Route component = { Profile } path = '/profile'/> ) }
                        { this.state.login && (<Redirect to = '/feed'/> ) }
                        { !this.state.login && (<Route component = { Login } path = '/login'/> ) }
                        { !this.state.login && (<Redirect to = '/login'/> ) }
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
