//Core
import React, { Component } from 'react';
import {string, func, arrayOf,shape} from 'prop-types';

//Instruments
import Styles from './styles.m.css';

//components

//Consumer
import { withProfile } from 'components/HOC/withProfile';

@withProfile
export default class Login extends Component {
    _handleLogin = (e) => {
        e.preventDefault()
        window.localStorage.setItem('react_login', true);
        this.props._handlerLogin( true );
    };

    render(){
        return (
            <section className = { Styles.login }>
                <div>
                    <h1>Go to Feed?</h1>
                    <a href="#" onClick={this._handleLogin}>LogIN</a>
                </div>

            </section>
        )
    }
}