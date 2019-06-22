/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-literals */
import {
    Avatar, Empty, Icon, List, Skeleton, Timeline
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import { timeAgo } from '../utils';

import { CreatePostComponent } from './CreatePostComponent';
import { LOADING_SKELETON, STRINGS } from '../constants';
import './TimeLine.css';

const {
    COMMENT_PLACEHOLDER, EMPTY_COMMENT, IMAGE_LINK,
} = STRINGS;
const { Item } = Timeline;
const IconText = ({
    type, text, action, className,
}) => (
    <span>
        <Icon
            type={type}
            className={className}
            onClick={action}
            theme="filled"
        />
        {text}
    </span>
);

class TimeLinePosts extends React.Component {
    componentDidMount() {
        const { handleLoadTimeLineData } = this.props;
        const ProfileData = JSON.parse(localStorage.getItem('profile'));
        const { sub } = ProfileData;
        const loggedUser = sub.substring(6);
        handleLoadTimeLineData(loggedUser);
    }

    render() {
        const {
            timelineData,
            handleCommentButton,
            handleCommentOnPost,
            handleLikeButton,
            handleValueChange,
            value,
            isTimelineFetching,
            textValueError,
        } = this.props;

        if ((isTimelineFetching || timelineData === [])) {
            return (
            // data loading simulation
                LOADING_SKELETON.map(items => {
                    const {
                        paragraph,
                        title,
                        loading,
                        active,
                        avatar,
                    } = items;
                    return (
                        <Skeleton
                            key={uuid()}
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
        }

        if (timelineData === [] && timelineData.length === 0 && !isTimelineFetching) {
            return (
                <Empty
                    image={IMAGE_LINK}
                    className="empty_image"
                    description={(
                        <span>
                            {EMPTY_COMMENT}
                        </span>
                    )}
                />
            );
        }

        return (

            <List
                itemLayout="vertical"
                dataSource={timelineData}
                size="large"
                renderItem={item => {
                    const {
                        _id,
                        name,
                        text,
                        date,
                        avatar,
                        image,
                        liked,
                        likes,
                        comments,
                        user,
                        isCommentOpen,
                    } = item;
                    return (
                        <List.Item
                            key={_id}
                            className="list_style"
                            actions={[
                                <IconText
                                    type="like"
                                    className={liked ? 'liked' : 'mr-8'}
                                    text={likes.length}
                                    action={() => handleLikeButton({ _id, liked, user })}
                                    key={2}
                                />,
                                <IconText
                                    type="message"
                                    className="mr-8"
                                    text={comments.length}
                                    action={() => handleCommentButton(_id)}
                                    key={3}
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                avatar={(<Avatar src={avatar} className="user-avatar" />)}
                                title={name}
                                description={timeAgo(date)}
                            />

                            {
                                image ? (
                                    <img
                                        className="post-image"
                                        alt={image ? `${name} image` : null}
                                        src={image}
                                    />
                                ) : <div />
                            }

                            <p>
                                {text.substring(0, 150)}
                            </p>

                            {/* post comment component */}
                            <div className={isCommentOpen ? 'show' : 'hide'}>

                                <CreatePostComponent
                                    handleOkFunction={() => handleCommentOnPost(_id)}
                                    InputPlaceholder={COMMENT_PLACEHOLDER}
                                    rowHeight={2}
                                    handleValueChange={handleValueChange}
                                    value={value}
                                    textValueError={textValueError}
                                />
                                <Timeline>
                                    {/* comment post */}
                                    {
                                        comments.length > 0
                                            ? comments.map(commentPost => {
                                                const {
                                                    avatar, name, text, _id,
                                                } = commentPost;
                                                return (
                                                    <Item key={_id}>
                                                        <section className="Timeline_comment">
                                                            {/* avatar */}
                                                            <Avatar
                                                                src={avatar}
                                                                className="user-avatar avatar-pop"
                                                            />
                                                            <div>
                                                                {/* name */}
                                                                <h3>
                                                                    {name}
                                                                </h3>
                                                                {/* comment */}
                                                                <p>{text}</p>
                                                            </div>
                                                        </section>
                                                    </Item>
                                                );
                                            }) : null
                                    }
                                </Timeline>
                            </div>
                        </List.Item>
                    );
                }
                }
            />
        );
    }
}

export default TimeLinePosts;

IconText.propTypes = {
    action: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    text: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
};
TimeLinePosts.propTypes = {
    handleCommentButton: PropTypes.func.isRequired,
    handleCommentOnPost: PropTypes.func.isRequired,
    handleLikeButton: PropTypes.func.isRequired,
    handleLoadTimeLineData: PropTypes.func.isRequired,
    handleValueChange: PropTypes.func.isRequired,
    isTimelineFetching: PropTypes.bool.isRequired,
    textValueError: PropTypes.string.isRequired,
    timelineData: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        isCommentOpen: PropTypes.bool.isRequired,
        liked: PropTypes.bool.isRequired,
    })).isRequired,
    value: PropTypes.string.isRequired,
};
