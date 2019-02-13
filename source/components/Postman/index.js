//Core
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import {from, to,} from 'gsap';

import Styles from './styles.m.css';

import { withProfile } from 'components/HOC/withProfile';

@withProfile
export default class Postman extends Component {
    state = {
        status: true
    };

    _animatePostmanEnter = (composer) => {
        from(composer, 1, {scale: 0, transformOrigin:'100% 100%', delay: 1, ease:Bounce.easeOut})
    };

    _animatePostmanEntered = () => {
        this.setState({
            status: false
        });
    }

    _animatePostmanExit = (composer) => {
        to(composer, .5, {y: 50, opacity: 0, ease:Back.easeIn})
    };

    render () {
        const {avatar, currentUserFirstName} = this.props;
        const {status} = this.state;

        return (
            <Transition
                in = {status}
                appear
                timeout = {5000}
                onEnter = { this._animatePostmanEnter }
                onEntered = { this._animatePostmanEntered }
                onExit = { this._animatePostmanExit }
            >
                <section className = { Styles.postman }>
                    <img src={avatar} />
                    <span>Welcome online, {currentUserFirstName}</span>
                </section>
            </Transition>
        )
    }
}

