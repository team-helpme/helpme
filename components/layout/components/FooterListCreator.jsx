import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const FooterListCreator = props => {
    const { list } = props;
    return (
        <ul>
            {
                list.map(link => {
                    const { href, text } = link;
                    return (
                        <Link href={href} key={text}>
                            <a>{text}</a>
                        </Link>
                    );
                })
            }
        </ul>
    );
};
export default FooterListCreator;
FooterListCreator.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    })).isRequired,
};