import React from 'react';
import PropTypes from 'prop-types';

import securePage from '../hoc/securePage';

const Secret = ({ loggedUser }) => (
    <div>
		Hi 
{' '}
<strong>{loggedUser.email}</strong>
. Try loading this page again using the incognito/private mode of your
		browser.
	
</div>
);

Secret.propTypes = {
    loggedUser: PropTypes.object.isRequired,
};

export default securePage(Secret);
