// Core
import React, { Component } from 'react';

//Instruments
import Styles from './styles.m.css';

//Consumer
import { Consumer } from 'components/HOC/withProfile';

export default class Composer extends Component {
    render () {
        return (
            <Consumer>
                {(context)=>{
                    const {
                        avatar,
                        currenUserFirstName
                    } = context;

                    return (
                        <section className={ Styles.composer }>
                            <img src={ avatar } />
                            <form>
                                <textarea placeholder={ `What's on your mind, ${currenUserFirstName}?` }/>
                                <input type="submit" value="Post"/>
                            </form>
                        </section>
                    )
                }}
            </Consumer>
        );
    }
}

