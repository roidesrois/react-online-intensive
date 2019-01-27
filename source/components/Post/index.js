// Core
import React, { Component } from 'react';
import moment from 'moment';
import {string, number} from 'prop-types';

//Instruments
import Styles from './styles.m.css';

//Consumer
import { Consumer } from 'components/HOC/withProfile';

export default class Post extends Component {
    static propTypes = {
        comment: string.isRequired,
        created: number.isRequired,
    };
    render () {
        const {comment, created} = this.props;

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
                                <time>{ moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                                <p>{comment}</p>
                            </section>
                        )
                    }}
                </Consumer>
        );
    }
}

