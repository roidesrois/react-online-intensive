// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

//Consumer
import { Consumer } from 'components/HOC/withProfile';

export default class StatusBar extends Component {
    render () {
        return (
            <Consumer>
                {(context)=>{
                    const {avatar, currenUserFirstName, currenUserLastName} = context;
                    return (
                        <section className={ Styles.statusBar}>
                            <button>
                                <img src ={avatar}/>
                                <span>{currenUserFirstName}&nbsp;{currenUserLastName}</span>
                            </button>
                        </section>
                    )
                }}
            </Consumer>
        )
    }
}