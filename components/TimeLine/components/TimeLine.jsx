/* eslint-disable no-tabs */
import React, { PropTypes } from 'react';
import Link from 'next/link';
import {
    Icon, Divider, Skeleton, List,
    Avatar
} from 'antd';
import PageLayout from '../../Layout';
import './TimeLine.css';
import CreatePostModal from './CreatePostModal';
import CreatePostComponent from './CreatePostComponent';
import data from '../../../data/data.json'; // dummy data to be replaced with api data
import profile from '../../../data/profile.json'; // dummy data to be replaced with api data
import { POPULAR_TOPIC, USERS_BIO, CREATEPOST_PLACEHOLDER } from '../constant';

/**
 * Helper function that is used to render the TimeLine Component
 * @function
 * @return {Object} returns the TimeLine component
 */
class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: '',
            visible: false,
            like: false,
            likeCount: 0,
            comment: false,
            activeComment: '',
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleLikeButton = this.handleLikeButton.bind(this);
    }

    componentDidMount() {
        this.setState({ profileData: data });
    }

    /**
     * Helper function that is used to show modal for the create post component
     * @function
     * @return {Object} returns 'true' to show the modal
     */
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    /**
     * Helper function that is used to handle the data from post component, it also closes the post modal
     * @function
     * @return {Object} returns 'false' to close the modal post component
     */
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    /**
     * Helper function that is used to close the post modal
     * @function
     * @return {Object} returns 'false' to close the modal
     */
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleLikeButton = id => {
        const likeCount = this.state.like ? this.state.likeCount - 1 : this.state.likeCount + 1;
        console.log(id);
        this.setState({
            like: !this.state.like,
            likeCount,
            activeLikeButton: id,
        });
    };

    handleComment = id => {
        this.setState({
            comment: !this.state.comment,
            activeComment: id,
        });
    };

    render() {
        const { profileData } = this.state;
        const LoadingSkeleton = (
            <section style={{ width: '90%', margin: '1em auto' }}>
                <Skeleton
                    paragraph={{ rows: 5, width: 20 }}
                    title
                    loading
                    active
                    avatar
                    avatar={{ size: 'large' }}
                />
            </section>
        );

        return (
            <PageLayout
                isSiderPresent
                isFooterPresent={false}
                isAuthenticated
                title="Timeline | Find friends"
            >
                <main className="TimeLine_content">

                    <section>
                        {/* edit component for mobile */}
                        <div className="create-icon-container">
                            <Icon type="form" className="create-icon" onClick={this.showModal} />
                        </div>
                        <CreatePostModal
                            visible={this.state.visible}
                            handleOkFunction={this.handleOk}
                            handleCancel={this.handleCancel}
                        />
                    </section>

                    {/* profile info desktop */}
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
                            <Divider type="vertical" style={{ height: '50px' }} />
                            <div className="users-follow-number">
                                <h3 className="count">123</h3>
                                <p>Followers</p>
                            </div>
                        </div>
                        <div className="users-bio">
                            {USERS_BIO}
                        </div>
                    </aside>

                    {/* popular topics aside */}
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

                    {/* online friends aside tab */}
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

                    {/* main timeline */}
                    <section className="TimeLine_post">
                        <section className="TimeLine-post-component">
                            <CreatePostComponent InputPlaceholder={CREATEPOST_PLACEHOLDER} rowHeight={5} />
                        </section>

                        <Divider />

                        {
                            profileData.length > 0 ? (
                                profileData.map(user => {
                                    const {
                                        id, first_name, last_name, email, post, avartar, image,
                                    } = user;

                                    return (
                                        <section key={id}>
                                            <div key={id} className="post-container">
                                                <img
                                                    src={avartar}
                                                    alt="user's face"
                                                    className="user-avatar"
                                                />

                                                <div className="post-content-container">
                                                    <div className="user-post-details">
                                                        <p className="user-name">
                                                            {`${first_name} ${last_name}`}
                                                        </p>
                                                        <p className="user-time-posted">3h</p>
                                                    </div>
                                                    {image ? (
                                                        <img src={image} className="post-image" />
                                                    ) : null}
                                                    <p className="user-post">{post}</p>

                                                    {/* post reaction */}
                                                    <div className="post-reaction">
                                                        <Icon
                                                            type="message"
                                                            className="message-icon"
                                                            onClick={() => this.handleComment(id)}
                                                        />
                                                        <Icon
                                                            type="like"
                                                            theme={this.state.like ? 'filled' : 'outlined'}
                                                            style={
                                                                this.state.like
                                                                    ? {
                                                                        color: '#1890ff',
                                                                    }
                                                                    : null
                                                            }
                                                            onClick={() => this.handleLikeButton(id)}
                                                            className="like-icon"
                                                        />
                                                        {this.state.likeCount}
                                                    </div>

                                                    <div style={this.state.activeComment === id ? { display: 'block' } : { display: 'none' }}>

                                                        <CreatePostComponent
                                                            handleOkFunction={this.handleOk}
                                                            InputPlaceholder="Write your reply"
                                                            rowHeight={2}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <Divider />
                                        </section>
                                    );
                                })
                            ) : (
                                    <>
                                        {LoadingSkeleton}
                                        {LoadingSkeleton}
                                    </>
                                )
                        }
                    </section>
                </main>
            </PageLayout>
        );
    }
}
export default TimeLine;
