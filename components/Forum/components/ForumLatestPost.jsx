import React from 'react';
import {
    Icon, Divider, Tag, Typography, Skeleton
} from 'antd';
import { LOADING_SKELETON } from '../constants';
import Link from 'next/link'
const { Text } = Typography;

const ForumLatestPost = props => {
    const { blogData } = props;
    return (
<section className="forum">
        {
            blogData.length > 0 ? blogData.map(data => {
                const {
                    image, title, answers, votes, views, tag, time,
                } = data;
                return (
                    <section key={time + tag}>
                        <section className="forum-item">
                            <img src={image} alt="user" className="user-avatar" />

                            <section className="forum-text">
                                <Link  href={`/forum/post?title=${title}`}>
      <a className="forum-topic">{title}</a>
    </Link>

                                <div className="forum-reaction">
                                    <span>
                                        <Text type="secondary">
                                            <Icon type="message" />
                                            {`${answers} answers`}
                                        </Text>
                                    </span>
                                    <span>
                                        <Text type="secondary">
                                            <Icon type="arrow-up" />
                                            {`${votes} votes`}
                                        </Text>
                                    </span>
                                    <span>
                                        <Text type="secondary">
                                            <Icon type="eye" />
                                            {`${views} views`}
                                        </Text>
                                    </span>
                                </div>

                                <div className="forum-time-tag">
                                    <div className="forum-tag">
                                        {(tag.split(' ').map((singleTag, id) => <Tag color="gold" style={{ fontSize: 10 }} key={id}>{singleTag}</Tag>)
                                        )}
                                    </div>
                                    <Text className="forum-time" type="secondary">
                                        {`Asked ${time}`}
                                    </Text>
                                </div>
                            </section>
                        </section>
                        <Divider />
                    </section>
                );
            })
                // data loading simulation
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

export default ForumLatestPost;
