import React from 'react';
import './Forum.css';
import { Typography, Icon, Skeleton } from 'antd';
import { TOP_USERS, LOADING_SKELETON } from '../constants';

const { Title } = Typography;

const ForumTopUsers = props => {
    const { blogData } = props;

    return (
      <section className="forum_topusers">
            <Title level={4}>Top Users of The Week</Title>
        {
                blogData.length > 0 ? TOP_USERS.map(user => {
                    const {
                        name, avartar, date_joined, post_count, comment_count,
                    } = user;

                    return (
                        <div className="forum_user" key={name}>
                <img src={avartar} alt={name} className="user-avatar" />

                <div className="forum_topusers-userdetails">
                  <p>{name}</p>
                  <p>{`since ${date_joined}`}</p>
                            </div>

                            <p className="forum_topusers-interaction">
                                {`${post_count + comment_count}`}
                                {' '}
                                <Icon type="star" theme="filled" style={{ color: '#FFD700' }} />
                            </p>
                        </div>
                    );
                }) // data loading simulation
                    : LOADING_SKELETON.map(items => {
                        const {
                            paragraph,
                            title,
                            loading,
                            active,
                            avatar,
                            id,
                        } = items;
                        return (
                            <Skeleton
                                key={id}
                                paragraph={paragraph}
                                title={title}
                                loading={loading}
                                active={active}
                                avatar={avatar}
                                className="skeleton-section"
                            />
                        );
                    })
            }
        </section>
    );
};

export { ForumTopUsers };
