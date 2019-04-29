import React from 'react';
import 'antd/dist/antd.css';
import {
 Layout, Menu, Icon, Button, Divider, Typography 
} from 'antd';
import Link from 'next/link';
import NavHeader from '../../Layout';
import './LandingPage.css';
import LandingPageContent from './LandingPageContent';
import securePage from '../../../hoc/securePage';

const { Content, Sider, Footer } = Layout;

/**
 * Function for displaying the landing page
 *
 * @function
 * @return {Object} The landing page
 */

const LandingPage = () => (
    <>
    <Layout className="LandingPage_layout">
		    <NavHeader title="HelpMe | Welcome to HelpMe" isAuthenticated={false} />

		    <Content className="LandingPage_body">
		        <Layout hasSider>
    <Sider breakpoint="lg" collapsedWidth="0" className="layout_sider">
		                <div className="logo" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
		                    <Menu.Item key="1">
		                        <Link href="/#">
		                            <a>
		                                <Icon type="user" />
		                                <span className="nav-text">nav 1</span>
		                            </a>
		                        </Link>
		                    </Menu.Item>

    <Menu.Item key="2">
		                        <Link href="/#">
		                            <a>
		                                <Icon type="video-camera" />
		                                <span className="nav-text">nav 2</span>
		                            </a>
		                        </Link>
		                    </Menu.Item>

		                    <Menu.Item key="3">
		                        <Link href="/#">
    <a>
		                                <Icon type="upload" />
    <span className="nav-text">nav 3</span>
		                            </a>
		                        </Link>
		                    </Menu.Item>

		                    <Menu.Item key="4">
    <Link href="/#">
    <a>
		                                <Icon type="user" />
		                                <span className="nav-text">nav 4</span>
		                            </a>
		                        </Link>
		                    </Menu.Item>
		                </Menu>
		            </Sider>

    <Content className="LandingPage_content">
		                <LandingPageContent
		                    level={1}
  title="Help me Title"
		                    paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero"
  buttonText="Lets begin this Journey"
		                    imageIsPresent
		                    imageLink="../../../static/connected.svg"
  buttonLink="/auth/sign-in"
		                    buttonIsPresent
		                />

		                <LandingPageContent
		                    level={2}
		                    title="Title 2"
		                    paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero"
		                    imageIsPresent
		                    imageLink="../../../static/smile.svg"
		                    buttonIsPresent={false}
		                    columnSection
		                />

		                <Divider />

		                <LandingPageContent
		                    level={3}
		                    title="Lorem Ipsum  dolor sit a "
  paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero"
		                    imageLink="../../../static/community.svg"
  reverseSection
		                    buttonIsPresent={false}
  imageIsPresent
		                />

		                <LandingPageContent
		                    level={2}
  title="Title 2"
  paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero"
		                    imageIsPresent={false}
		                    buttonIsPresent={false}
		                />

		                <Divider />

    <LandingPageContent
		                    level={3}
		                    title="Lorem Ipsum  dolor sit a "
  paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero v Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero"
		                    imageIsPresent
		                    imageLink="../../../static/hangout.svg"
		                    reverseSection={false}
		                    buttonIsPresent
		                    buttonText="Create an Account"
		                    buttonLink="/auth/sign-in"
		                />
		            </Content>
		        </Layout>
		    </Content>
		</Layout>
    <Layout>
		    <Content>
		        <Footer className="LandingPage_footer">
		            <Link href="/">
		                <a>
		                    <img src="../../../static/logo-light.png" alt="helpme logo" className="logo" />
		                </a>
		            </Link>

		            <ul>
		                <Link href="/#">
    <li>
		                        <a>Home</a>
		                    </li>
		                </Link>

    <Link href="/contact">
		                    <li>
		                        <a>Contact us</a>
		                    </li>
		                </Link>

		                <Link href="/about-us">
		                    <li>
		                        <a>About Helpme</a>
		                    </li>
		                </Link>
		            </ul>

		            <ul>
		                <Link href="/about-us">
    <li>
		                        <a>Security & Privacy</a>
		                    </li>
		                </Link>
		                <Link href="/about-us">
		                    <li>
		                        <a>Terms Of Service</a>
		                    </li>
		                </Link>
		            </ul>
		        </Footer>
		    </Content>
		</Layout>
	</>
);

export default LandingPage;
