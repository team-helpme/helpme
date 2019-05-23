import React from 'react';
import profile from '../../../data/profile.json'; // dummy data to be replaced with api data

const TimeLineOnlineFriends = () => (
    <aside className="TimeLine_online-friends">
        <h3>Online Friends</h3>
        <ul>
            {profile.map(user => (
                <li key={user.email}>
                    <img
                      src={user.photo}
                      alt="user's face"
                      className="user-avatar avartar-online"
                    />
                    {user.name}
                </li>
            ))}
        </ul>
    </aside>
);

export default TimeLineOnlineFriends;
