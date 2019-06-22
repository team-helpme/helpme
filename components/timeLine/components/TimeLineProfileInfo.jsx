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
    FOLLOWING, FOLLOWERS, AT, COMPLETE_YOUR_PROFILE,
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
            isUserProfileComplete,
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
        const {
            picture, nickname, profile, avatar, name,
        } = userProfile;

        if (isUserProfileComplete) {
            const {
                firstName,
                lastName,
                following,
                followers,
                bio,
            } = profile[0];

            return (
                <aside className="TimeLine_profile-info">
                    <div className="profile-modal-content">
                        <img
                            src={avatar}
                            alt={name}
                            className="user-avatar profile-avatar"
                        />
                        {/* followers stat */}
                        <h3 className="user-name">
                            {firstName}
                            {' '}
                            {lastName}
                        </h3>
                        <p>
                            {AT}
                            {name}
                        </p>
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
                    </div>
                </aside>
            );
        }

        return (
            <aside className="TimeLine_profile-info">
                <div className="profile-modal-content">
                    <img
                        src={picture || avatar}
                        alt="name"
                        className="user-avatar profile-avatar"
                    />
                    {/* followers stat */}
                    <h3 className="user-name">{nickname || name}</h3>
                    <Button
                        type="primary"
                        onClick={handleModal}
                    >
                        {COMPLETE_YOUR_PROFILE}
                    </Button>
                </div>
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

const TimeLineProfileInfo = Form.create()(TimeLineProfileForm);

export default TimeLineProfileInfo;

TimeLineProfileForm.propTypes = {
    handleModal: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    isFormModalOpen: PropTypes.bool.isRequired,
    isUserProfileComplete: PropTypes.bool.isRequired,
    isUserProfilePresent: PropTypes.bool.isRequired,
    userProfile: PropTypes.object,
};

TimeLineProfileForm.defaultProps = {
    userProfile: {},
};
