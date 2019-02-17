// Core
import React, {Component} from 'react';
import { Transition } from 'react-transition-group';
import { fromTo, from, to } from 'gsap';


//Components
import {withProfile} from 'components/HOC/withProfile';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';
import Postman from 'components/Postman';

import Catcher from 'components/Catcher';

// Instruments
import Styles from './styles.m.css';
import {getUniqueID, delay} from 'instruments';
import {api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init'

@withProfile
export default class Feed extends Component {
    state = {
        isPostsFetching: false,
        notification: true,
        posts: []
    }

    componentDidMount() {
        const { currentUserFirstName, currentUserLastName} = this.props;

        this._fetchPosts();
        socket.emit('join', GROUP_ID);

        socket.on('create', (postJSON) =>{
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if(
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`)
            {
                this.setState(({ posts }) =>({
                    posts: [createdPost, ...posts]
                }));
            }
        });

        socket.on('remove', (postJSON) =>{
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if(
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`)
            {
                this.setState(({ posts }) =>({
                    posts: posts.filter( post => post.id !== removedPost.id )
                }));
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost, meta } = JSON.parse(postJSON);

            if(
                `${currentUserFirstName} ${currentUserLastName}` !==
                `${meta.authorFirstName} ${meta.authorLastName}`)
            {
                this.setState(({posts}) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost : post,
                    ),
                }));
            }
        })

    }

    componentWillUnmount(){
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostsFetching: state
        })
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET'
        });

        const {data: posts} = await response.json();

        this.setState({
            posts,
            isPostsFetching: false
        })
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify({comment})
        });

        const {data: post} = await response.json();

        this.setState(({posts}) => ({
            posts: [post, ...posts],
            isPostsFetching: false
        }));
    }

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: TOKEN
            }
        });

        const {data: likedPost} = await response.json();

        this.setState(({posts}) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post,
            ),
            isPostsFetching: false
        }));
    };

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN
            }
        });

        const postKey = this.state.posts.findIndex((el) => {
            return el.id === id;
        });

        let newPosts = this.state.posts;
        newPosts.splice(postKey, 1);

        this.setState({
            posts: newPosts,
            isPostsFetching: false
        })
    }

    _animateComposerEnter = (composer) => {
        fromTo(composer, 1, {opacity: 0}, {opacity:1})
    };

    _animatePostmanEnter = (composer) => {
        from(composer, 1, {scale: 0, transformOrigin:'100% 100%', delay: 1, ease:Bounce.easeOut})
    };

    _animatePostmanEntered = () => {
        this.setState({
            notification: false
        });
    }

    _animatePostmanExit = (composer) => {
        to(composer, .5, {y: 50, opacity: 0, ease:Back.easeIn})
    };


    render() {
        const {isPostsFetching, posts, notification} = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Catcher key={post.id}>
                    <Post  {...post} _likePost={ this._likePost } _removePost={this._removePost}/>
                </Catcher>
            )
        });

        return (
            <section className={ Styles.feed }>
                <Spinner isSpinning={ isPostsFetching }/>
                <StatusBar/>
                <Transition
                    in
                    appear
                    onEnter = { this._animateComposerEnter }
                    timeout = { 1000 }
                >
                    <Composer _createPost={ this._createPost }/>
                </Transition>
                <Transition
                    in = {notification}
                    appear
                    timeout = {5000}
                    onEnter = { this._animatePostmanEnter }
                    onEntered = { this._animatePostmanEntered }
                    onExit = { this._animatePostmanExit }
                >
                    <Postman/>
                </Transition>
                { postsJSX }
            </section>
        );
    }
}

