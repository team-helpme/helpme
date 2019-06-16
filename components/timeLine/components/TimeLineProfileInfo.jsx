import {
    Divider, Button, Modal, Form, Input, Spin
} from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import {
    STRINGS, PROFILE_INPUTS
} from '../constants';

const {
    FOLLOWING, FOLLOWERS, USERS_BIO, AT,
} = STRINGS;

class TimeLineProfileForm extends React.Component {
state = {
    isProfilePresent: false,
    name: '',
}

componentDidUpdate(prevProps) {
    const { name } = this.state;
    const { profile } = prevProps;
    if ((JSON.stringify(profile) !== '{}' && JSON.stringify(profile) !== undefined) && (profile.name !== name)) {
        this.handleGetProfileData(profile);
    }
}

handleGetProfileData(profile) {
    this.setState(
        prevState => ({ ...prevState, ...profile, isProfilePresent: true })
    );
}

render() {
    const { isProfilePresent } = this.state;
    const { handleModal } = this.props;
    if (isProfilePresent) {
        const {
            picture,
            nickname,
            bio,
        } = this.state;
        return (
            <aside className="TimeLine_profile-info">
                <img
                    src={picture}
                    alt="name"
                    className="user-avatar"
                />
                {/* followers stat */}
                <h3 className="user-name">{nickname}</h3>
                <p>
                    {AT}
                    {nickname}
                </p>
                {/* if the user does not have a bio, ask to complete the profile */}
                {(!bio)
                    ? <Button type="primary" onClick={handleModal}>Complete Your Profile</Button> : (
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
                                {USERS_BIO}
                            </div>
                        </>
                    )
                }
                <Modal
                    title="Basic Modal"
                    visible={this.props.isFormModalOpen}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleModal}
                >
                    <Form className="registration-form" onSubmit={this.handleSubmit}>
                        {
                            PROFILE_INPUTS.map(profile => {
                                const {
                                    id, label, placeholder, type,
                                } = profile;

                                return (
                                    <Form.Item label={label} key={id}>
                                        <Input placeholder={placeholder} name={id} onChange={e => this.props.handleTextChange(e)} />
                                    </Form.Item>

                                );
                            })
                        }
                    </Form>
                </Modal>
            </aside>
        );
    }
    return (
        <aside className="TimeLine_profile-info">
            <div className="loading_Div">
                <Spin />
            </div>
        </aside>
    );
}
}

const TimeLineProfileInfo = Form.create()(TimeLineProfileForm);

export default TimeLineProfileInfo;

TimeLineProfileInfo.propTypes = {
    handleModal: PropTypes.func.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    isFormModalOpen: PropTypes.bool.isRequired,
    profile: PropTypes.obj,
};
