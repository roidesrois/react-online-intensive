// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export default class StatusBar extends Component {
    static propTypes ={
        avatar: PropTypes.string,
        currenUserFirstName: PropTypes.string.isRequired,
        currenUserLastName: PropTypes.string.isRequired,
    };

    render () {
        const {
            avatar,
            currenUserFirstName,
            currenUserLastName,
        } = this.props;

        return <section className={ Styles.statusBar}>
            <button>
                <img src ={avatar}/>
                <span>{`${currenUserFirstName}`}&nbsp;{`${currenUserLastName}`}</span>
            </button>
        </section>
    }
}