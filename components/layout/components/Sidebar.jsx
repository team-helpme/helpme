import { Icon, Layout, Menu } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

import { SIDEBAR_MENU_ITEMS } from '../constants';

const { Sider } = Layout;

/**
 * Function that controls the sidebar which displays on mobile
 * @function
 * @param {boolean} isSiderPresent shows sidebar if true
 * @return {Object} Side Bar
 */
export default function Sidebar(props) {
    const { isSiderPresent, selectedKey } = props;
    return (
        isSiderPresent
            ? (
                <Sider breakpoint="lg" collapsedWidth="0" className="layout_sider">
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]}>
                        {
                            SIDEBAR_MENU_ITEMS.map(sideBarItem => {
                                const {
                                    href, key, type, text,
                                } = sideBarItem;
                                return (
                                    <Menu.Item key={key}>
                                        <Link href={href}>
                                            <a>
                                                <Icon type={type} />
                                                <span className="nav-text">{text}</span>
                                            </a>
                                        </Link>
                                    </Menu.Item>
                                );
                            })
                        }
                    </Menu>
                </Sider>
            ) : null
    );
}

Sidebar.propTypes = {
    isSiderPresent: PropTypes.bool,
    selectedKey: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
    isSiderPresent: false,
};
