import React from 'react';


const TimeLineOnlineFriends = () => (
    <aside className="TimeLine_online-friends">
        <h3>Online Friends</h3>
        <ul>
            {profile.map(user => {
                const { email, photo, name } = user;
                return (
                    <li key={email}>
                        <img
                          src={photo}
                          alt="user's face"
                          className="user-avatar avartar-online"
                        />
                        {name}
                    </li>
                );
            })}
        </ul>
    </aside>
);

export default TimeLineOnlineFriends;
