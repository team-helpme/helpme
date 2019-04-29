import React, { PropTypes } from 'react';
import Link from 'next/link';
import securePage from '../../../hoc/securePage';
import NavHeader from '../../Layout';

const TimeLine = ({ isAuthenticated }) => (
    <div>
    {!isAuthenticated ? (
            <div>Not Authenticated</div>
        ) : (
            <div>
                <NavHeader isAuthenticated />
				You are now Authenticated
            </div>
        )}
    </div>
);

// TimeLine.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
// };

export default securePage(TimeLine);
