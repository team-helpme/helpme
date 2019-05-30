/* eslint-disable no-tabs */
import React from 'react';
import {
    Icon, Divider
} from 'antd';
import { connect } from 'react-redux';

import PageLayout from '../../Layout';
import './TimeLine.css';
import CreatePostModal from './CreatePostModal';
import { CreatePostComponent } from './CreatePostComponent';
// dummy data to be replaced with api data, commented so that test can pass, will be removed when api is ready
import data from '../../../data/data.json';
import {
    CREATEPOST_PLACEHOLDER, TIMELINE_TITLE
} from '../constant';
import TimeLineProfileInfo from './TimeLineProfileInfo';
import TimeLinePopularTopic from './TimeLinePopularTopic';
import TimeLineOnlineFriends from './TimeLineOnlineFriends';
import TimeLinePosts from './TimeLinePosts';

import { controlModal } from '../actions';

/**
 * @class TimeLine
 * @extends {React.Component}
 * @return {Object} returns the TimeLine component
 */
class TimeLine extends React.Component {
    // static getInitialProps({ reduxStore, req }) {
    //     const isServer = !!req;
    //     // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    //     reduxStore.dispatch(controlModal(isServer));
    //     return {};
    // }

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
            statusValue: '',
            commentValue: '',
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleLikeButton = this.handleLikeButton.bind(this);
        this.handleStatusValue = this.handleStatusValue.bind(this);
        this.handleCommentValue = this.handleCommentValue.bind(this);
    }

    componentDidMount() {
        this.setState({ profileData: data });
        console.log(this.props);
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
        const { visible } = this.state;
        // close the modal;
        // this.ModalHandler();
        if (visible) {
            this.setState({
                visible: false,
            });
            console.log('handle ok', this.state.status);
        }

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

    handleCommentValue = e => {
        this.setState({
            commentValue: e.target.value,
        });
        console.log(e.target.value);
    }

    handleStatusValue = e => {
        this.setState({
            statusValue: e.target.value,
        });
        console.log(e.target.value);
    }

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
                          handleOnChange={this.handleStatusValue}
                          textValue={this.state.statusValue}
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
                              handleOnChange={this.handleStatusValue}
                              textValue={this.state.statusValue}
                            />
                        </section>

                        <Divider />

                        <section style={{ background: 'white' }}>
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
                              handleOnChange={this.handleCommentValue}
                              textValue={this.state.commentValue}
                            />
                        </section>
                    </section>
                </main>
            </PageLayout>
        );
    }
}

const mapDispatchToProps = { controlModal };
export default connect(
    null,
    mapDispatchToProps
)(TimeLine);
