//Core
import React, { Component } from 'react';
import Styles from './styles.m.css';

import { withProfile } from 'components/HOC/withProfile';

const Postman = (props) => {
    const {avatar, currentUserFirstName} = props;

    return (
        <section className = { Styles.postman }>
            <img src={avatar} />
            <span>Welcome online, {currentUserFirstName}</span>
        </section>
    )

}
export default withProfile(Postman);

