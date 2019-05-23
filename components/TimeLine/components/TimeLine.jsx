/* eslint-disable no-tabs */
import React, { PropTypes } from 'react';
import Link from 'next/link';
import {
    Icon, Divider, Skeleton, List, Avatar
} from 'antd';
import PageLayout from '../../Layout';
import '../../../static/TimeLine.css';
import CreatePostModal from './CreatePostModal';
import CreatePostComponent from './CreatePostComponent';
import data from '../../../data/data.json'; // dummy data to be replaced with api data
import { CREATEPOST_PLACEHOLDER, LOADING_SKELETON } from '../constant';
import TimeLineProfileInfo from './TimeLineProfileInfo';
import TimeLinePopularTopic from './TimeLinePopularTopic';
import TimeLineOnlineFriends from './TimeLineOnlineFriends';

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
                    <TimeLineProfileInfo />
                    {/* popular topics aside */}
                    <TimeLinePopularTopic />
                    {/* online friends aside tab */}
                    <TimeLineOnlineFriends />

                    {/* main timeline */}
                    <section className="TimeLine_post">
                        {/* create post component */}
                        <section className="TimeLine-post-component">
                            <CreatePostComponent InputPlaceholder={CREATEPOST_PLACEHOLDER} rowHeight={5} />
                        </section>

                        <Divider />

                        {
                            profileData.length > 0 ? (
                                profileData.map(user => {
                                    const {
                                        id, first_name, last_name, email, post, avatar, image,
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

                                                        {/* post comment component */}
                                                        <CreatePostComponent
                                                          handleOkFunction={this.handleOk}
                                                          InputPlaceholder="Write your reply"
                                                          rowHeight={20}
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
                                        />
                                    );
                                })
                        }
                    </section>
                </main>
            </PageLayout>
        );
    }
}
export default TimeLine;
