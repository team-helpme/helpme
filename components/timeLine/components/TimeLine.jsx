/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Divider, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import {
    commentButtonClicked,
    handlePostComment,
    addPostToTimeline,
    likeButtonClicked,
    loadOnlineFriendsData,
    loadTimeLineData,
    loadUsersProfile,
    postProfileDataToDatabase,
    postProfileDataToDatabaseError,
    postProfileDataToDatabaseSuccess,
    setOnlineFriendsData,
    setOnlineFriendsError,
    setTimeLineData,
    setTimeLineError,
    setUsersProfileSuccess
} from '../actions';
import { components } from '../../layout';
import { CreatePostComponent } from './CreatePostComponent';
import CreatePostModal from './CreatePostModal';
import {
    getError,
    getIsAuthenticated,
    getIsOnlineFriendsFetching,
    getIsTimelineFetching,
    getIsUserProfileComplete,
    getIsUserProfilePresent,
    getOnlineFriendsData,
    getTimelineData,
    getUsersProfile
} from '../selectors';
import { STRINGS } from '../constants';
import TimeLinePosts from './TimeLinePosts';
import TimeLinePopularTopic from './TimeLinePopularTopic';
import TimeLineProfileInfo from './TimeLineProfileInfo';
import TimeLineOnlineFriends from './TimeLineOnlineFriends';
import { utils } from '../../authentication';
import { openNotificationWithIcon } from '../../signup/utils';

const {
    CREATE_POST_PLACEHOLDER,
    COMPLETE_YOUR_PROFILE,
    TIMELINE_TITLE,
    POST_LENGTH_ERROR,
} = STRINGS;
const { PageLayout } = components;
const { isAuthenticated, login } = utils;

// notification button
/** Helper function that is used to render the TimeLine Component
 * @class TimeLine
 * @extends {React.Component}
 * @return {Object} returns the TimeLine component
 */
class TimeLine extends React.Component {
    state = {
        commentValue: '',
        isFormModalOpen: false,
        isModalOpen: false,
        statusValue: '',
        textValueError: '',
    };

    componentDidMount() {
        // if user is not authenticated, redirect to login
        if (!isAuthenticated()) {
            login();
        }

        const { loadOnlineFriendsData } = this.props;
        // load timeline data and friends data
        loadOnlineFriendsData();
    }

    componentDidUpdate(prevState) {
        let ProfileData;
        const {
            error,
            setUsersProfileSuccess,
            usersProfile,
            loadUsersProfile,
        } = this.props;

        // we need to get profileData from local storage
        if (localStorage.profile) {
            ProfileData = JSON.parse(localStorage.getItem('profile'));
            const { sub, picture, nickname } = ProfileData;
            // we have to parse it because auth0 adds some strings to the profile data
            const userPartialData = { id: sub.substring(6), nickname, picture };
            const { id } = userPartialData;

            // because of async, the profile data will not be available in the local storage until
            // some time. so always check the local storage and compare with
            // current user profile redux state.
            // but when the userdata changes in local storage, pull it and update state
            if (usersProfile === null) {
                // set data to redux for initial rendering
                setUsersProfileSuccess(userPartialData);

                // get full profile from the database for full data rendering
                loadUsersProfile(id);
            }
        }
        if (prevState.error !== error) {
            openNotificationWithIcon('error', error);
        }
    }

    /**
     * Helper function that handles the visibility of a modal
     * @function
     * @return {Object} returns 'true' to show the modal
     */
    modalHandler = () => {
        const { isModalOpen } = this.state;
        this.setState({
            isModalOpen: !isModalOpen,
        });
    };

    /**
     * Helper function that is used to handle the data from post component,
     * it also closes the post modal
     * @function
     * @return {Object} returns 'false' to close the modal post component
     */
    handleCreateStatus = () => {
        const { addPostToTimeline } = this.props;

        const { isModalOpen, statusValue } = this.state;
        const { usersProfile } = this.props;
        const { name, avatar, id } = usersProfile;
        if (statusValue.length > 10 && statusValue.length < 500) {
            const body = {
                avatar,
                id,
                name,
                text: statusValue,
            };
            // // get post
            addPostToTimeline(body);

            // close modal
            if (isModalOpen) {
                this.modalHandler();
            }

            // clear post component
            this.setState({
                statusValue: '',
                textValueError: '',
            });
        } else {
            this.setState({
                textValueError: POST_LENGTH_ERROR,
            });
        }

        // close the modal and make make an api call
    };

    /**
     * Helper function that is used to handle clicking on the like button
     * @function
     * @param {Number} id the id of the liked post
     * @return {Object} changes the state of the like component
     */
    handleLikeButton = id => {
        const { likeButtonClicked } = this.props;
        likeButtonClicked(id);
    };

    /**
     * Helper function that is used to handle clicking on the comment button
     * @function
     * @param {Number} id the id of the commented post
     * @return {Object} changes the state of the like component
     */
    handleCommentButton = id => {
        const { commentButtonClicked } = this.props;
        commentButtonClicked(id);
    };

    /**
     * Helper function that is used to handle comments on posts
     * @function
     * @param {string} postId of the post been commented
     * @return {Object} returns the comment made
     */
    handleCommentOnPost = postId => {
        const { handlePostComment, usersProfile } = this.props;
        const { avatar, name, _id } = usersProfile;
        const { commentValue } = this.state;
        const body = {
            avatar,
            id: _id,
            name,
            text: commentValue,
        };

        handlePostComment({ body, postId });
        this.setState({
            commentValue: '',
        });
    };

    /**
     * Helper function that is used to set the status value
     * @function
     * @param {string} id of the post been commented
     * @return {Object} returns the status value
     */
    handleStatusValueChange = e => {
        this.setState({
            statusValue: e.target.value,
        });
    };

    /**
     * Helper function that is used to load the timeline
     * @function
     * @param {string} id of the current logged user
     * @return {Object} returns the timelineData
     */
    handleLoadTimeLineData = id => {
        const { loadTimeLineData } = this.props;
        // get the current user's
        loadTimeLineData(id);
    };

    /**
     * Helper function that is used to set the status value
     * @function
     * @param {string} id of the post been commented
     * @return {Object} returns the status value
     */
    handleCommentValueChange = e => {
        this.setState({
            commentValue: e.target.value,
        });
    };

    handleTextChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handlePostSubmit = () => {
        // pull out email from the redux state
        const { usersProfile, postProfileDataToDatabase } = this.props;
        const { id } = usersProfile;

        // get this data from the local state
        const {
            firstName, lastName, city, country, bio,
        } = this.state;

        const body = {
            bio,
            city,
            country,
            firstName,
            id,
            lastName,
        };
        // make a redux call and send the data to the database
        postProfileDataToDatabase(body);
        // close the form
        this.FormModalHandler();
    };

    FormModalHandler = () => {
        const { isFormModalOpen } = this.state;
        this.setState({
            isFormModalOpen: !isFormModalOpen,
        });
    };

    render() {
        const {
            timelineData,
            isTimelineFetching,
            onlineFriendsData,
            isOnlineFriendsFetching,
            error,
            isUserProfileComplete,
            isUserProfilePresent,
            usersProfile,
        } = this.props;

        const {
            commentValue,
            isModalOpen,
            statusValue,
            isFormModalOpen,
            textValueError,
        } = this.state;

        return (
            <PageLayout
                isSiderPresent={!isTimelineFetching}
                isFooterPresent={false}
                isAuthenticated
                title={TIMELINE_TITLE}
                selectedKey="1"
            >
                <main className="TimeLine_content">
                    <section>
                        {/* edit component for mobile */}
                        <div className="create-icon-container">
                            <Icon
                                type="form"
                                className="create-icon"
                                onClick={this.modalHandler}
                            />
                        </div>

                        <CreatePostModal
                            visible={isModalOpen}
                            handleOkFunction={this.handleCreateStatus}
                            closeModal={this.modalHandler}
                            handleValueChange={this.handleStatusValueChange}
                            value={statusValue}
                            textValueError={textValueError}
                        />
                    </section>

                    {/* profile info desktop */}
                    <TimeLineProfileInfo
                        error={error}
                        userProfile={usersProfile}
                        isUserProfilePresent={isUserProfilePresent}
                        isUserProfileComplete={isUserProfileComplete}
                        handleOk={this.handlePostSubmit}
                        isFormModalOpen={isFormModalOpen}
                        handleModal={this.FormModalHandler}
                        handleTextChange={this.handleTextChange}
                        loadUsersProfile={loadUsersProfile}
                        textValueError={textValueError}
                    />
                    {/* popular topics aside */}
                    <TimeLinePopularTopic />
                    {/* online friends aside tab */}
                    <TimeLineOnlineFriends
                        onlineFriendsData={onlineFriendsData}
                        isOnlineFriendsFetching={isOnlineFriendsFetching}
                    />
                    {/* main timeline */}
                    <section className="TimeLine_post">
                        {/* create post component */}
                        <section className="TimeLine-post-component">
                            <CreatePostComponent
                                InputPlaceholder={CREATE_POST_PLACEHOLDER}
                                rowHeight={5}
                                handleOkFunction={this.handleCreateStatus}
                                handleValueChange={this.handleStatusValueChange}
                                value={statusValue}
                                textValueError={textValueError}
                            />
                        </section>

                        <Divider />

                        <section className="TimeLine_posts">
                            {/* button to complete profile
                             */}
                            <div className="profile_complete_button">
                                {!isUserProfileComplete ? (
                                    <Button type="primary" onClick={this.FormModalHandler}>
                                        {COMPLETE_YOUR_PROFILE}
                                    </Button>
                                ) : null}
                            </div>
                            {/* timeline posts */}
                            <TimeLinePosts
                                isTimelineFetching={isTimelineFetching}
                                timelineData={timelineData}
                                handleLoadTimeLineData={this.handleLoadTimeLineData}
                                userProfile={usersProfile}
                                handleLikeButton={this.handleLikeButton}
                                handleFavButton={this.handleFavButton}
                                handleCommentButton={this.handleCommentButton}
                                handleCommentOnPost={this.handleCommentOnPost}
                                handleValueChange={this.handleCommentValueChange}
                                value={commentValue}
                                handleModal={this.FormModalHandler}
                                textValueError={textValueError}
                            />
                        </section>
                    </section>
                </main>
            </PageLayout>
        );
    }
}

const mapStateToProps = state => ({
    error: getError(state),
    isAuthenticated: getIsAuthenticated(state),
    isTimelineFetching: getIsTimelineFetching(state),
    isUserProfileComplete: getIsUserProfileComplete(state),
    isUserProfilePresent: getIsUserProfilePresent(state),
    onlineFriendsData: getOnlineFriendsData(state),
    onlineFriendsFetching: getIsOnlineFriendsFetching(state),
    timelineData: getTimelineData(state),
    usersProfile: getUsersProfile(state),
});

const timeLineActions = {
    addPostToTimeline,
    commentButtonClicked,
    handlePostComment,
    likeButtonClicked,
    loadOnlineFriendsData,
    loadTimeLineData,
    loadUsersProfile,
    postProfileDataToDatabase,
    postProfileDataToDatabaseError,
    postProfileDataToDatabaseSuccess,
    setOnlineFriendsData,
    setOnlineFriendsError,
    setTimeLineData,
    setTimeLineError,
    setUsersProfileSuccess,
};

const mapDispatchToProps = dispatch => bindActionCreators(timeLineActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLine);

TimeLine.propTypes = {
    addPostToTimeline: PropTypes.func.isRequired,
    commentButtonClicked: PropTypes.func.isRequired,
    error: PropTypes.string,
    handlePostComment: PropTypes.func.isRequired,
    isOnlineFriendsFetching: PropTypes.bool,
    isTimelineFetching: PropTypes.bool.isRequired,
    isUserProfileComplete: PropTypes.bool.isRequired,
    isUserProfilePresent: PropTypes.bool.isRequired,
    likeButtonClicked: PropTypes.func.isRequired,
    loadOnlineFriendsData: PropTypes.func.isRequired,
    loadTimeLineData: PropTypes.func.isRequired,
    loadUsersProfile: PropTypes.func.isRequired,
    onlineFriendsData: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            photo: PropTypes.string.isRequired,
        })
    ).isRequired,
    postProfileDataToDatabase: PropTypes.func.isRequired,
    setUsersProfileSuccess: PropTypes.func.isRequired,
    timelineData: PropTypes.array,
    usersProfile: PropTypes.object,
};

TimeLine.defaultProps = {
    error: null,
    isOnlineFriendsFetching: null,
    timelineData: [],
    usersProfile: {},
};
