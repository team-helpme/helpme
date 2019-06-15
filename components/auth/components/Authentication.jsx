/* eslint-disable no-shadow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Router from 'next/router';
import Auth from './auth';
import {
    getProfile,
    loginFailure,
    loginSuccess
} from '../actions';
import {
    getIsAuthenticated,
    getUserProfile
} from '../selectors';

const auth = new Auth();
class Authentication extends PureComponent {
    componentDidMount() {
        const { isAuthenticated, userProfile } = auth;
        const { loginSuccess, loginFailure, getProfile } = this.props;
        console.log(this.props.loginSuccess);
        if (isAuthenticated()) {
            loginSuccess();
            getProfile(auth.getProfile());
            Router.push('/timeline');
        } else if (!auth.isAuthenticated()) {
            loginFailure();
            auth.login();
        }
    }

    render() {
        return (
            <div>
                signing you in .....
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: getIsAuthenticated(state),
    userProfile: getUserProfile(state),
});

const authActions = {
    getProfile,
    loginFailure,
    loginSuccess,
};

const mapDispatchToProps = dispatch => bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
