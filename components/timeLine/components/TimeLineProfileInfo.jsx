/* eslint-disable react/forbid-prop-types */
import {
    Divider, Button, Modal, Form, Input, Spin
} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import {
    STRINGS, PROFILE_INPUTS
} from '../constants';

const {
    FOLLOWING, FOLLOWERS, USERS_BIO, AT, COMPLETE_YOUR_PROFILE,
} = STRINGS;

class TimeLineProfileForm extends React.Component {
    render() {
        const {
            handleModal,
            isFormModalOpen,
            handleOk,
            handleTextChange,
            isUserProfilePresent,
            userProfile,
        } = this.props;

        // check if profile is present
        if (!isUserProfilePresent) {
            return (
                <aside className="profile-loading">
                    <div className="loading_Div">
                        <Spin />
                    </div>
                </aside>
            );
        }
        // check if profile is present and not empty
        if (isUserProfilePresent) {
            const {
                avatar, email, name, profile,
            } = userProfile;
            console.log('userProfile', userProfile);
            console.log('timelineinfo', profile);
            const {
                bio, city, country, firstName, followers, following, lastName, nickname,
            } = profile[0];

            return (
                <aside className="TimeLine_profile-info">
                    <img
                        src={avatar}
                        alt="name"
                        className="user-avatar profile-avatar"
                    />
                    {/* followers stat */}
                    <h3 className="user-name">{`${firstName} ${lastName}` || name}</h3>
                    <p>
                        {AT}
                        {nickname || name}
                    </p>
                    {/* if the user does not have a bio, ask to complete the profile */}
                    {(profile.length === 0)
                        ? (
                            <Button
                                type="primary"
                                onClick={handleModal}
                            >
                                {COMPLETE_YOUR_PROFILE}
                            </Button>
                        ) : (
                            <>
                                <div className="user-followers-stat">
                                    <div className="users-follow-number">
                                        <h3 className="count">{following}</h3>
                                        <p>{FOLLOWING}</p>
                                    </div>
                                    <Divider type="vertical" className="divider-height" />
                                    <div className="users-follow-number">
                                        <h3 className="count">{followers}</h3>
                                        <p>{FOLLOWERS}</p>
                                    </div>
                                </div>
                                <div className="users-bio">
                                    {bio}
                                </div>
                            </>
                        )
                    }
                    <Modal
                        title="Basic Modal"
                        visible={isFormModalOpen}
                        onOk={handleOk}
                        onCancel={handleModal}
                    >
                        <Form className="registration-form" onSubmit={this.handleSubmit}>
                            {
                                PROFILE_INPUTS.map(item => {
                                    const {
                                        id, label, placeholder,
                                    } = item;

                                    return (
                                        <Form.Item label={label} key={id}>
                                            <Input
                                                placeholder={placeholder}
                                                name={id}
                                                onChange={e => handleTextChange(e)}
                                            />
                                        </Form.Item>
                                    );
                                })
                            }
                        </Form>
                    </Modal>
                </aside>
            );
        }
    }
}

const TimeLineProfileInfo = Form.create()(TimeLineProfileForm);

export default TimeLineProfileInfo;

TimeLineProfileForm.propTypes = {
    handleModal: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    isFormModalOpen: PropTypes.bool.isRequired,
    isUserProfilePresent: PropTypes.bool.isRequired,
    profile: PropTypes.object,
};

TimeLineProfileForm.defaultProps = {
    profile: null,
};
