/* eslint-disable no-shadow */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import {
    getProfile,
    loginFailure,
    loginSuccess
} from '../actions';
import {
    getIsAuthenticated,
    getUserProfile
} from '../selectors';

class Authentication extends PureComponent {
    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        console.log(this.props);
        return (
            <div>
                Authenticating you ....
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
