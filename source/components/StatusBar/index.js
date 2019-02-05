// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

//Consumer
import { withProfile } from 'components/HOC/withProfile';

@withProfile
export default class StatusBar extends Component {
    render () {
        const {avatar, currentUserFirstName, currentUserLastName} = this.props;

        return (
            <section className={ Styles.statusBar}>
                <button>
                    <img src ={avatar}/>
                    <span>{currentUserFirstName}&nbsp;{currentUserLastName}</span>
                </button>
            </section>

        )
    }
}