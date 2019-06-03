import React from 'react';
import {
    Icon, Divider, Skeleton, List, Typography, Avatar
} from 'antd';

import { CreatePostComponent } from './CreatePostComponent';
import { LOADING_SKELETON, STRINGS } from '../constants';

const { COMMENT_PLACEHOLDER } = STRINGS;
const IconText = ({ type, text, action }) => (
    <span>
        <Icon
            type={type}
            className="mr-8"
            onClick={action}
        />
        {text}
    </span>
);

const TimeLinePosts = props => {
    const {
        profileData,
        like,
        activeComment,
        handleComment,
        handleOk,
        handleLikeButton,
    } = props;
    return profileData.length !== 0 ? (
        <List
            itemLayout="vertical"
            dataSource={profileData}
            style={{ margin: '0 1em' }}
            size="large"
            renderItem={user => {
                const {
                    id,
                    first_name,
                    last_name,
                    email,
                    post,
                    avatar,
                    image,
                    likeCount,
                    textValue,
                    handleOnChange,
                    likes,
                    comment,
                    favs,
                } = user;
                return (
                    <List.Item
                        key={id}
                        actions={[
                          <IconText type="star-o" text={favs} action={id => handleFavButton(id)} />,
                          <IconText type="like-o" text={likes} action={id => handleLikeButton(id)} />,
                          <IconText type="message" text={comment} action={id => handleComment(id)} />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={(<Avatar src={avatar} className="user-avatar" />)}
                            title={`${first_name} ${last_name}`}
                            description="3h ago"
                        />

                        {
                            image ? (
                                <img
                                    className="post-image"
                                    alt={image ? `${first_name} image` : null}
                                    src={image}
                                />
                            ) : null
                        }

                        {post}

                        {/* post comment component */}
                        <div className={activeComment === id ? 'show' : 'hide'}>
                            <CreatePostComponent
                                handleOkFunction={handleOk}
                                InputPlaceholder={COMMENT_PLACEHOLDER}
                                rowHeight={2}
                                textValue={textValue}
                                handleOnChange={handleOnChange}
                            />
                        </div>
                    </List.Item>
                );
            }
            }
        />
    ) : (
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
