// Core
import React, { Component } from 'react';

//Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            {id: 1, comment: 'Hi!', created: 1526825076849},
            {id: 2, comment: 'Привет!', created: 1526825076999},
        ]
    };

    render () {
        const { posts } = this.state;

        const postsJSX = posts.map((post)=>{
            return <Post key = {post.id} {...post} />
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning />
                <StatusBar/>
                <Composer/>
                { postsJSX }
            </section>
        );
    }
}

