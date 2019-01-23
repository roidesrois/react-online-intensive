// Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

export default class Composer extends Component {
    render () {
        const {
            avatar,
            currenUserFirstName
        } = this.props;

        return (
                <section className={ Styles.composer }>
                    <img src={ avatar } />
                    <form>
                        <textarea placeholder={ `What's on your mind, ${currenUserFirstName}?` }/>
                        <input type="submit" value="Post"/>
                    </form>
                </section>
        );
    }
}

