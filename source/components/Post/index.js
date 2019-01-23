// Core
import React, { Component } from 'react';
import moment from 'moment';

//Instruments
import avatar from 'theme/assets/lisa';
import Styles from './styles.m.css';

console.log( Styles );


export default class Post extends Component {
    render () {
        return (
                <section className = { Styles.post }>
                    <div className="cross"/>
                    <img src={ avatar } />
                    <a href="">Lisa Simpson</a>
                    <time>{ moment().format('MMMM D h:mm:ss a')}</time>
                    <p>Howdy!</p>
                </section>
        );
    }
}

