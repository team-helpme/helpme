import React from 'react';
import './Forum.css';
import {TOP_USERS} from  '../constants';

const ForumTopUsers = () =>  (
     <section className="forum_topusers">
  {  TOP_USERS.map(user => {
const {name, avartar, date_joined, post_count, comment_count,} = user

    return (
<div className="forum_user" key={name}>
        <img src={avartar} alt={name} className="user-avatar" />

        <div className="forum_topusers-userdetails">
        <p>{name}</p>
        <p>{`since ${date_joined}`}</p>
        </div>

<p className='forum_topusers-interaction'>{`${post_count + comment_count } interactions`}</p>

  </div>
    )
    })
}
        </section>
    )

export {ForumTopUsers}
