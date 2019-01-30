// Core
import React, { Component } from 'react';
import moment from 'moment';
import {string, number, func, array} from 'prop-types';

//Instruments
import Styles from './styles.m.css';

//Consumer
import { Consumer } from 'components/HOC/withProfile';
import Like from 'components/Like';

export default class Post extends Component {
    static propTypes = {
        id:         string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        likes:      array.isRequired,
        _likePost:  func.isRequired,
    };
    render () {
        const {comment, created, _likePost, id, likes } = this.props;

        return (
                <Consumer>
                    {(context)=>{
                        return (
                            <section className = { Styles.post }>
                                <span className={Styles.cross}/>
                                <div className="cross"/>
                                <img src={ context.avatar } />
                                <a href="">{`${context.currentUserFirstName} ${context.currentUserLastName}`}</a>
                                <time>{ moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                                <p>{comment}</p>
                                <Like _likePost = { _likePost } id = { id } likes = { likes } {...context}/>
                            </section>
                        )
                    }}
                </Consumer>
        );
    }
}

