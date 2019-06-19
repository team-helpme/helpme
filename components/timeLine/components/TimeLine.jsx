/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Divider, Icon, Button
} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import {
    commentButtonClicked,
    favButtonClicked,
    handlePostComment,
    handlePostUpdate,
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
import { generateCommentData, generateData } from '../utils';
import {
    getError,
    getIsAuthenticated,
    getIsOnlineFriendsFetching,
    getIsTimelineFetching,
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

const { CREATE_POST_PLACEHOLDER, COMPLETE_YOUR_PROFILE, TIMELINE_TITLE } = STRINGS;
const { PageLayout } = components;

const { isAuthenticated, login } = utils;

// notification button
/** Helper function that is used to render the TimeLine Component
 * @class TimeLine
 * @extends {React.Component}
 * @return {Object} returns the TimeLine component
 */
class TimeLine extends React.Component {
state ={
    commentValue: '',
    isFormModalOpen: false,
    isModalOpen: false,
    statusValue: '',
}

componentDidMount() {
    if (!isAuthenticated) {
        login();
    }

    const { loadTimeLineData, loadOnlineFriendsData } = this.props;
    loadTimeLineData();
    loadOnlineFriendsData();
}

componentDidUpdate(prevState) {
    let ProfileData;
    let userId;
    const {
        error, setUsersProfileSuccess, usersProfile, loadUsersProfile,
    } = this.props;

    // we need to get profileData from local storage
    if (localStorage.profile) {
        ProfileData = JSON.parse(localStorage.getItem('profile'));
        const { sub, picture, nickname } = ProfileData;
        // we have to parse it because auth0 adds some strings to the profile data
        const userPartialData = { picture, nickname, id: sub.substring(6) };

        // because of async, the profile data will not be available in the local storage until
        // some time. so always check the local storage and compare with
        // current user profile redux state.
        // but when the userdata changes in local storage, pull it and update state
        if (usersProfile === null) {
            const { id } = userPartialData;
            // set data to redux for initial rendering
            setUsersProfileSuccess(userPartialData);
            // get full profile from the database for full data rendering
            loadUsersProfile(id);
        }
    }
    if (prevState.error !== error) { openNotificationWithIcon('error', error); }
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
        const {
            handlePostUpdate, timelineData,
        } = this.props;

        const { isModalOpen, statusValue } = this.state;

        // // get post
        handlePostUpdate(generateData(timelineData.length + 1, statusValue));

        // close modal
        if (isModalOpen) {
            this.modalHandler();
        }

        // clear post component
        this.setState({
            statusValue: '',
        });
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
    * Helper function that is used to handle favourite button
    * @function
    * @param {Number} id the id of the commented post
    * @return {Object} changes the state of the like component
    */
   handleFavButton = id => {
       const { favButtonClicked } = this.props;
       favButtonClicked(id);
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

    handleCommentOnPost = id => {
        const { handlePostComment } = this.props;
        const { commentValue } = this.state;

        handlePostComment(generateCommentData(id, commentValue));
        this.setState({
            commentValue: '',
        });
    }

    handleStatusValueChange = e => {
        this.setState({
            statusValue: e.target.value,
        });
    }

    handleCommentValueChange = e => {
        this.setState({
            commentValue: e.target.value,
        });
    }

      handleTextChange = e => {
          this.setState(
              {
                  [e.target.name]: e.target.value,
              }
          );
      }

    handlePostSubmit = () => {
        // pull out email from the redux state
        const { usersProfile, postProfileDataToDatabase } = this.props;
        const { id, email } = usersProfile;

        // get this data from the local state
        const {
            firstName,
            lastName,
            city,
            country,
            bio,
        } = this.state;

        const body = {
            bio,
            city,
            country,
            email,
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
            isUserProfilePresent,
            usersProfile,
        } = this.props;

        const {
            commentValue, isModalOpen, statusValue, isFormModalOpen,
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
                        />
                    </section>

                    {/* profile info desktop */}
                    <TimeLineProfileInfo
                        error={error}
                        userProfile={usersProfile}
                        isUserProfilePresent={isUserProfilePresent}
                        handleOk={this.handlePostSubmit}
                        isFormModalOpen={isFormModalOpen}
                        handleModal={this.FormModalHandler}
                        handleTextChange={this.handleTextChange}
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
                            />
                        </section>

                        <Divider />

                        <section className="TimeLine_posts">
                            {/* button to complete profile
                             */}
                            <div className="profile_complete_button">
                                {
                                    (usersProfile !== null && usersProfile.bio === undefined)
                                        ? (
                                            <Button
                                                type="primary"
                                                onClick={this.FormModalHandler}
                                            >
                                                {COMPLETE_YOUR_PROFILE}
                                            </Button>
                                        ) : null
                                }
                            </div>
                            {/* timeline posts */}
                            <TimeLinePosts
                                isTimelineFetching={isTimelineFetching}
                                profileData={timelineData}
                                userProfile={usersProfile}
                                handleLikeButton={this.handleLikeButton}
                                handleFavButton={this.handleFavButton}
                                handleCommentButton={this.handleCommentButton}
                                handleCommentOnPost={this.handleCommentOnPost}
                                handleValueChange={this.handleCommentValueChange}
                                value={commentValue}
                                handleModal={this.FormModalHandler}
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
    isUserProfilePresent: getIsUserProfilePresent(state),
    onlineFriendsData: getOnlineFriendsData(state),
    onlineFriendsFetching: getIsOnlineFriendsFetching(state),
    timelineData: getTimelineData(state),
    usersProfile: getUsersProfile(state),
});

const timeLineActions = {
    commentButtonClicked,
    favButtonClicked,
    handlePostComment,
    handlePostUpdate,
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);

TimeLine.propTypes = {
    commentButtonClicked: PropTypes.func.isRequired,
    error: PropTypes.string,
    favButtonClicked: PropTypes.func.isRequired,
    handlePostComment: PropTypes.func.isRequired,
    handlePostUpdate: PropTypes.func.isRequired,
    isOnlineFriendsFetching: PropTypes.bool,
    isTimelineFetching: PropTypes.bool.isRequired,
    isUserProfilePresent: PropTypes.bool.isRequired,
    likeButtonClicked: PropTypes.func.isRequired,
    loadOnlineFriendsData: PropTypes.func.isRequired,
    loadTimeLineData: PropTypes.func.isRequired,
    loadUsersProfile: PropTypes.func.isRequired,
    onlineFriendsData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
    })).isRequired,
    postProfileDataToDatabase: PropTypes.func.isRequired,
    setUsersProfileSuccess: PropTypes.func.isRequired,
    timelineData: PropTypes.arrayOf(PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        comment: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        image: PropTypes.string,
        lastName: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        post: PropTypes.string.isRequired,
    })),
    usersProfile: PropTypes.object,
};

TimeLine.defaultProps = {
    error: null,
    isOnlineFriendsFetching: null,
    timelineData: [],
    usersProfile: {},
};
'';
