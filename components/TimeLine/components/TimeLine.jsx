/* eslint-disable no-tabs */
import React, { PropTypes } from 'react';
import Link from 'next/link';
import { Icon, Divider } from 'antd';
import PageLayout from '../../Layout';
import './TimeLine.css';
import CreatePostModal from './CreatePostModal';
import { CreatePostComponent } from './CreatePostComponent';
import data from '../../../data/data.json'; // dummy data to be rplaced with api data
import profile from '../../../data/profile.json'; // dummy data to be rplaced with api data

/**
 * Helper function that is used to render the TimeLine Component
 *
 * @class
 *
 * @return {Object} returns the TimeLine component
 */
class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
	    console.log(e);
	    this.setState({
	        visible: false,
	    });
	};




	handleLikeButton = (event, id) => {
	    const likeCount = this.state.like ? this.state.likeCount - 1 : this.state.likeCount + 1;

	    this.setState({
	        like: !this.state.like,
	        likeCount,
	    });
	};

	handleComment = id => {
	    this.setState({
	        comment: !this.state.comment,
	        activeComment: id,
	    });
	    // this.setState({
	    //     comment: !this.state.comment,
	    // });
	};




	render() {
	    return (
    <PageLayout
	            siderIsPresent
  footerPresent={false}
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
	                        handleOk={this.handleOk}
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
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
							harum odit inventore, iste dignissimos laudantium! Veniam.
      	                    </div>
	                </aside>

    {/* popular topics aside */}
	                <aside className="TimeLine_popular-topic">
	                    <h3>Popular Topic</h3>
    <ul>
	                        <li>
	                            <Link href="#">
	                                <a>Lorem, ipsum.</a>
	                            </Link>
	                        </li>
	                        <li>
	                            <Link href="#">
    <a>Quaerat, fuga!</a>
	                            </Link>
	                        </li>
	                        <li>
	                            <Link href="#">
	                                <a>Nemo, odit.</a>
	                            </Link>
	                        </li>
	                        <li>
	                            <Link href="#">
	                                <a>Aspernatur, harum?</a>
	                            </Link>
	                        </li>
    <li>
	                            <Link href="#">
	                                <a>Pariatur, libero!</a>
	                            </Link>
	                        </li>
    <li>
	                            <Link href="#">
    <a>Voluptatem, rerum!</a>
	                            </Link>
	                        </li>
	                        <li>
	                            <Link href="#">
	                                <a>Placeat, illo!</a>
	                            </Link>
	                        </li>
	                        <li>
    <Link href="#">
    <a>Voluptatem, nesciunt?</a>
	                            </Link>
	                        </li>
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
	                        <CreatePostComponent placeholder="What's are you thinking?" minRows={5} />
	                    </section>
    <Divider />
	                    {data.map(user =>
	                    // const {
	                    //     id, first_name, last_name, email, post, avartar, image,
	                    // } = user;
	                        (
    <section key={user.id}>
	                                <div key={user.id} className="post-container">
    <img
	                                        src={user.avartar}
	                                        alt="user's face"
	                                        className="user-avatar"
	                                    />

    <div className="post-content-container">
	                                        <div className="user-post-details">
	                                            <p className="user-name">
    {`${user.first_name} ${user.last_name}`}
	                                            </p>
	                                            <p className="user-time-posted">3h</p>
	                                        </div>
	                                        {user.image ? (
    <img src={user.image} className="post-image" />
	                                        ) : null}
    <p className="user-post">{user.post}</p>

    {/* post reaction */}
	                                        <div className="post-reaction">
	                                            <Icon
  type="message"
	                                                className="message-icon"
	                                                onClick={() => this.handleComment(user.id)}
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
  onClick={evenet => this.handleLikeButton(event, user.id)}
	                                                className="like-icon"
	                                            />
    {' '}
	                                            {this.state.likeCount}
	                                        </div>

	                                        <div style={this.state.activeComment === user.id ? { display: 'block' } : { display: 'none' }}>

	                                            <CreatePostComponent
  minRows={2}
	                                                placeholder="Write your reply"
	                                            />
	                                        </div>

	                                    </div>

	                                </div>
	                                <Divider />
	                            </section>
	                        )
	                    )}
	                </section>

	            </main>
	        </PageLayout>
	    );
	}
}

// TimeLine.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
// };

// export default securePage(TimeLine);
export default TimeLine;
