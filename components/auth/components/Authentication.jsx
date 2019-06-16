/* eslint-disable no-shadow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import React, { PureComponent } from 'react';
import Router from 'next/router';
import Auth from './auth';
import {
    getUserProfile,
    loginFailure,
    loginSuccess
} from '../actions';
import {
    getIsAuthenticated,
    getUsersProfile
} from '../selectors';

const auth = new Auth();
class Authentication extends PureComponent {
    componentDidMount() {
        const { isAuthenticated, userProfile } = auth;
        const { loginSuccess, loginFailure, getUserProfile } = this.props;
        try {
            auth.handleAuthentication().then(() => {
                if (isAuthenticated()) {
                    loginSuccess();
                    Router.push('/timeline');
                }
            });
        } catch (err) {
            console.log('err', err);
            if (!auth.isAuthenticated()) {
                loginFailure();
                auth.login();
            }
        }
    }

    render() {
        return (

            <div className="loading_Div">
                <Spin tip="signing you in ..." size="large" />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state),
    userProfile: getUsersProfile(state),
});

const authActions = {
    getUserProfile,
    loginFailure,
    loginSuccess,
};

const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
