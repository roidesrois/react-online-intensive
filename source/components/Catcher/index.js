//core
import React, { Component } from 'react';

//Instruments
import { object } from 'prop-types';
import Styles from './styles.m.css';

export default class Catcher extends Component {
    static propTypes= {
      children: object.isRequired
    };

    state = {
        error: false
    }

    componentDidCatch (error, stack) {
        console.error(error);
        console.log('STACKTRACE:', stack.componentStack)

        this.setState({
            error: true
        });
    }

    render(){

        if( this.state.error ) {
            return <section className = {Styles.catcher}>
                <span>A mysterios 👽 error 🧲 occured.</span>
                <p>
                    Our space 📡 frontent 🐥 fixing that already
                </p>
            </section>
        }

        return this.props.children;
    }
}
