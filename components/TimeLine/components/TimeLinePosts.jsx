import React from 'react';
import {
    Icon, Divider, Skeleton
} from 'antd';
import { CreatePostComponent } from './CreatePostComponent';
import {
    LOADING_SKELETON, COMMENT_PLACEHOLDER
} from '../constant';

const TimeLinePosts = props => {
    const {
        profileData, like, activeComment, handleComment, handleOk,
    } = props;
    return (

        profileData.length !== 0 ? (
            profileData.map(user => {
                const {
                    id, first_name, last_name, email, post, avatar, image, likeCount,
                } = user;

                return (
                    <section key={id}>
                        {/* avatar */}
                        <div key={id} className="post-container">
                            <img
                              src={avatar}
                              alt="user's face"
                              className="user-avatar"
                            />

                            <div className="post-content-container">
                                <div className="user-post-details">
                                    {/* post user */}
                                    <p className="user-name">
                                        {`${first_name} ${last_name}`}
                                    </p>

                                    {/* post time */}
                                    <p className="user-time-posted">3h</p>
                                </div>

                                {/* post image */}
                                {image ? (
                                    <img src={image} className="post-image" />
                                ) : null}

                                {/* post */}
                                <p className="user-post">{post}</p>

                                {/* post reaction */}
                                <div className="post-reaction">
                                    <Icon
                                      type="message"
                                      className="message-icon"
                                      onClick={() => handleComment(id)}
                                    />
                                    <Icon
                                      type="like"
                                      theme={like ? 'filled' : 'outlined'}
                                      className={
                                            like ? 'liked like-icon' : 'like-icon'
                                        }
                                      onClick={() => handleLikeButton(id)}

                                    />
                                    {likeCount}
                                </div>

                                {/* post comment component */}
                                <div className={activeComment === id ? 'show' : 'hide'}>
                                    <CreatePostComponent
                                      handleOkFunction={handleOk}
                                      InputPlaceholder={COMMENT_PLACEHOLDER}
                                      rowHeight={2}
                                    />
                                </div>
                            </div>
                        </div>
                        <Divider />
                    </section>
                );
            })
        )
            :
            // data loading simulation
            LOADING_SKELETON.map(items => {
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
    );
};

export default TimeLinePosts;
