import React from 'react';
import { Divider } from 'antd';
import { STRINGS } from '../constants';

const { USERS_BIO } = STRINGS;
const TimeLineProfileInfo = () => (
    <aside className="TimeLine_profile-info">
        <img
          src="https://robohash.org/temporeinventorererum.bmp?size=50x50&set=set1"
          alt="profile info of user"
          className="user-avatar"
        />

        {/* followers stat */}
        <h3 className="user-name">Baba Rahman</h3>
        <div className="user-followers-stat">
            <div className="users-follow-number">
                <h3 className="count">123</h3>
                <p>Following</p>
            </div>
            <Divider type="vertical" className="divider-height" />
            <div className="users-follow-number">
                <h3 className="count">123</h3>
                <p>Followers</p>
            </div>
        </div>
        <div className="users-bio">
            {USERS_BIO}
        </div>
    </aside>
);

export default TimeLineProfileInfo;
