import React from 'react';
import Link from 'next/link';
import { POPULAR_TOPIC, POPULAR_TOPIC_TEXT } from '../constants';
import './TimeLine.css';

const TimeLinePopularTopic = () => (
    <aside className="TimeLine_popular-topic">
        <h3>{POPULAR_TOPIC_TEXT}</h3>
        <ul>
            {
                POPULAR_TOPIC.map(topic => {
                    const { link, text } = topic;
                    return (
                        <li key={text}>
                            <Link href={link}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a>{text}</a>
                            </Link>
                        </li>
                    );
                })
            }
        </ul>
    </aside>
);

export default TimeLinePopularTopic;
