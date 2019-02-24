// Core
import React, { Component } from 'react';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import {fromTo} from 'gsap';
import { Link } from 'react-router-dom';

// Instruments
import Styles from './styles.m.css';

//Consumer
import { withProfile } from 'components/HOC/withProfile';
import { socket } from 'socket/init';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false
    };

    componentDidMount () {
        socket.on('connect', () =>{
            this.setState({
                online: true
            })
        })

        socket.on('disconnect', () =>{
            this.setState({
                online: false
            })
        })
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animateStatusBarEnter = (composer) => {
        fromTo(composer, 1, {opacity: 0}, {opacity:1})
    };

    _handleLogout = (e) => {
        window.localStorage.setItem('react_login', false);
        this.props._handlerLogin( false );
    };

    render () {
        const {avatar, currentUserFirstName, currentUserLastName} = this.props;
        const {online} = this.state;

        const statusStyle = cx(Styles.status,{
            [Styles.online]: online,
            [Styles.offline]: !online
        })

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <Transition
                appear
                in
                timeout = {1000}
                onEnter = { this._animateStatusBarEnter}
                >
                <section className={ Styles.statusBar}>
                    <div className = { statusStyle }>
                        <div>{statusMessage}</div>
                        <span/>
                    </div>
                    <Link to = '/profile'>
                        <img src ={avatar}/>
                        <span>{currentUserFirstName}&nbsp;{currentUserLastName}</span>
                    </Link>
                    <Link to="/feed">Feed</Link>
                    <div onClick={this._handleLogout} className = { Styles.logout }>
                        <div>LogOut</div>
                    </div>
                </section>
            </Transition>
        )
    }
}