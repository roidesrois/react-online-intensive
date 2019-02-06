// Core
import React, { Component } from 'react';
import moment from 'moment';
import {string, number, func, array} from 'prop-types';

//Instruments
import Styles from './styles.m.css';

//Consumer
import { withProfile } from 'components/HOC/withProfile';
import Like from 'components/Like';

@withProfile
export default class Post extends Component {
    static propTypes = {
        id:         string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        likes:      array.isRequired,
        _likePost:  func.isRequired,
        _removePost:  func.isRequired,
    };

    _removePost = () => {
        const { _removePost, id} = this.props;

        _removePost(id);
    }

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}` ? <span onClick = { this._removePost } className={Styles.cross}/> : null;
    }

    render () {
        const {comment, created, _likePost, id, likes, avatar, firstName, lastName } = this.props;
        const cross = this._getCross();

        return (
            <section className = { Styles.post }>
                {cross}
                <img src={ avatar } />
                <a href="">{`${firstName} ${lastName}`}</a>
                <time>{ moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
                <Like _likePost = { _likePost } id = { id } likes = { likes } />
            </section>
        );
    }
}

