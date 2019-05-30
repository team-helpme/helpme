import React from 'react';
import Link from 'next/link';
import { POPULAR_TOPIC } from '../constant';
import './TimeLine.css';

const TimeLinePopularTopic = () => (
    <aside className="TimeLine_popular-topic">
        <h3>Popular Topic</h3>
        <ul>
            {
                POPULAR_TOPIC.map(topic => {
                    const { link, text } = topic;
                    return (
                        <li key={text}>
                            <Link href={link}>
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
