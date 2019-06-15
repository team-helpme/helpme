import {
    Divider, Button, Modal, Form, Input
} from 'antd';
import React from 'react';

import {
    STRINGS, PROFILE_INPUTS
} from '../constants';

const { FOLLOWING, FOLLOWERS, USERS_BIO } = STRINGS;

class TimeLineProfileForm extends React.Component {
    render() {
        const { profile } = this.props;
        const {
            email, id, nickname, picture, bio,
        } = profile;

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
@
                    {nickname}
                </p>

                {(!bio)
                    ? <Button type="primary" onClick={this.props.handleModal}>Complete Your Profile</Button> : (
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
}

const TimeLineProfileInfo = Form.create()(TimeLineProfileForm);

export default TimeLineProfileInfo;
