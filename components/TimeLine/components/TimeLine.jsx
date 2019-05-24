/* eslint-disable no-tabs */
import React, { PropTypes } from 'react';
import {
    Icon, Divider
} from 'antd';
import PageLayout from '../../Layout';
import '../../../static/TimeLine.css';
import CreatePostModal from './CreatePostModal';
import { CreatePostComponent } from './CreatePostComponent';
import data from '../../../data/data.json'; // dummy data to be replaced with api data
import {
    CREATEPOST_PLACEHOLDER, TIMELINE_TITLE
} from '../constant';
import TimeLineProfileInfo from './TimeLineProfileInfo';
import TimeLinePopularTopic from './TimeLinePopularTopic';
import TimeLineOnlineFriends from './TimeLineOnlineFriends';
import TimeLinePosts from './TimeLinePosts';

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
            activeLikeButton: '',
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleLikeButton = this.handleLikeButton.bind(this);
    }

    componentDidMount() {
        this.setState({ profileData: data });
    }

    /**
     * Helper function that handels the visibility of a modal
     * @function
     * @return {Object} returns 'true' to show the modal
     */
    ModalHandler = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    /**
     * Helper function that is used to handle the data from post component, it also closes the post modal
     * @function
     * @return {Object} returns 'false' to close the modal post component
     */
    handleOk = e => {
        // close the modal;
        this.ModalHandler();

        // make an api call
    };

    /**
    * Helper function that is used to hable clicking on the like button
    * @function
    * @param {Number} id the id of the liked post
    * @return {Object} changes the state of the like component
    */
    handleLikeButton = id => {
        this.setState({
            like: !this.state.like,
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
              isSiderPresent={profileData.length > 0}
              isFooterPresent={false}
              isAuthenticated
              title={TIMELINE_TITLE}
            >
                <main className="TimeLine_content">

                    <section>
                        {/* edit component for mobile */}
                        <div className="create-icon-container">
                            <Icon type="form" className="create-icon" onClick={this.ModalHandler} />
                        </div>

                        <CreatePostModal
                          visible={this.state.visible}
                          handleOkFunction={this.handleOk}
                          closeModal={this.ModalHandler}
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
                            <CreatePostComponent
                              InputPlaceholder={CREATEPOST_PLACEHOLDER}
                              rowHeight={5}
                            />
                        </section>

                        <Divider />

                        {/* timeline posts */}
                        <TimeLinePosts
                          profileData={profileData}
                          like={this.state.like}
                          likeCount={this.state.likeCount}
                          activeComment={this.state.activeComment}
                          activeLikeButton={this.state.activeLikeButton}
                          handleComment={this.handleComment}
                          handleLikeButton={this.handleLikeButton}
                          handleOk={this.handleOk}
                        />
                    </section>
                </main>
            </PageLayout>
        );
    }
}
export default TimeLine;
