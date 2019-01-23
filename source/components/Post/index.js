// Core
import React, { Component } from 'react';
import moment from 'moment';

//Instruments
import Styles from './styles.m.css';

//Consumer
import { Consumer } from 'components/HOC/withProfile';

export default class Post extends Component {
    render () {
        return (
                <Consumer>
                    {(context)=>{
                        const {
                            avatar,
                            currenUserFirstName,
                            currenUserLastName
                        } = context;

                        return (
                            <section className = { Styles.post }>
                                <div className="cross"/>
                                <img src={ avatar } />
                                <a href="">{`${currenUserFirstName} ${currenUserLastName}`}</a>
                                <time>{ moment().format('MMMM D h:mm:ss a')}</time>
                                <p>Howdy!</p>
                            </section>
                        )
                    }}
                </Consumer>
        );
    }
}

