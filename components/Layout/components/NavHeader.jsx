import React from 'react';
import Head from 'next/head';
import 'antd/dist/antd.css';
import {
 Layout, Menu, Icon, Button, Typography 
} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import securePage from '../../../hoc/securePage';

const { Header } = Layout;

/**
 * Head function that is infused into all pages and controls page's title
 *
 * @function
 * @param {String} title - The title of the currently viewed page
 * @return {Object} head metadata which is inserted in every page
 *
 */

function NavHeader(props) {
    const { title, isAuthenticated } = props;
    console.log(props);

    return (
    <>
    <Head>
			    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=/, initial-scale=1.0" />
			    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			    <link rel="shortcut icon" href="../../static/favicon.ico" type="image/x-icon" />
			    <link rel="icon" href="../../static/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
			    <title>{!title ? 'Helpme | Connect with Friends' : title}</title>
			</Head>

    <Header theme="light" className="layout_header-mobile">
    <Link href="/">
    <a>
    <img src="../../../static/logo.png" alt="helpme logo" className="logo" />
			        </a>
			    </Link>

			    {isAuthenticated ? (
    <Button className="LandingPage_login_button" type="danger">
			            <Link href="/auth/sign-off">
			                <a>Logout</a>
			            </Link>
			        </Button>
			    ) : (
			        <Button className="LandingPage_login_button" type="primary">
			            <Link href="/auth/sign-in">
    <a>Login</a>
			            </Link>
			        </Button>
			    )}
			</Header>

    {/* header for desktop */}
    <Header theme="light" className="layout_header-desktop">
			    <Link href="/">
			        <a>
    <img src="../../../static/logo.png" alt="helpme logo" className="logo" />
			        </a>
			    </Link>

			    {isAuthenticated ? (
    <>
    {/* navbar */}
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} className="layout_header-list">
						    <Menu.Item key="1">
    <Link href="/">
						            <a>Home</a>
						        </Link>
						    </Menu.Item>

						    <Menu.Item key="2">
    <Link href="/forum">
						            <a>Forum</a>
						        </Link>
						    </Menu.Item>

						    <Menu.Item key="3">
						        <Link href="/Dairy">
						            <a>nav 3</a>
						        </Link>
						    </Menu.Item>
						</Menu>

    <Button className="LandingPage_login_button" type="danger">
						    <Link href="/auth/sign-off">
    <a>Logout</a>
						    </Link>
						</Button>
					</>
			    ) : (
			        <Button className="LandingPage_login_button" type="primary">
			            <Link href="/auth/sign-in">
			                <a>Login</a>
			            </Link>
			        </Button>
			    )}
			</Header>
		</>
    );
}

Head.propTypes = {
    title: PropTypes.string,
};

export default NavHeader;
