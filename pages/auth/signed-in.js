import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { parseHash, setToken } from '../../components/Authentication';

export default class SignedIn extends React.Component {
	static propTypes = {
	    url: PropTypes.object.isRequired,
	};

	componentDidMount() {
	    parseHash((err, result) => {
	        if (err) {
	            console.error('Something happened with the Sign In request');
	            return;
	        }

	        setToken(result.idToken, result.accessToken);
	        // Router.push('/timeline');
	        window.location.replace('/timeline');
	    });
	}

	render() {
	    return <div>signing you in .....</div>;
	}
}
