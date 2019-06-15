import PropTypes from 'prop-types';
import Router from 'next/router';
import Auth from '../../components/auth/components/auth';
// /* eslint-disable react/forbid-prop-types */
// import React from 'react';

const auth = new Auth();
// import Router from 'next/router';

// import { parseHash, setToken } from '../../components/auth';

export default class SignedIn extends React.Component {
    // static propTypes = {
    //     url: PropTypes.object.isRequired,
    // };

    componentDidMount() {
	    auth.handleAuthentication();
	    Router.push('/auth/auth-check');
    }

    render() {
	    return <div>signing you in .....</div>;
    }
}
