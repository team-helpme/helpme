import PropTypes from 'prop-types';
import Auth from '../../components/auth/components/auth';
// /* eslint-disable react/forbid-prop-types */
// import React from 'react';

const auth = new Auth();
// import Router from 'next/router';

// import { parseHash, setToken } from '../../components/auth';

export default class SignedIn extends React.Component {
	static propTypes = {
	    url: PropTypes.object.isRequired,
	};

	componentDidMount() {
	    auth.handleAuthentication();
	    // parseHash((err, result) => {
	    //     if (err) {
	    //         console.error('Something happened with the Sign In request');
	    //         return;
	    //     }

	    //     setToken(result.idToken, result.accessToken);
	    //     // Router.push('/timeline');
	    //     window.location.replace('/timeline');
	    // });
	}

	render() {
	    return <div>signing you in .....</div>;
	}
}
