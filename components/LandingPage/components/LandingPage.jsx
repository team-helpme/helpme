import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Divider } from 'antd';
import './LandingPage.css';
import LandingPageContent from './LandingPageContent';
import PageLayout from '../../Layout';

const { Content } = Layout;

/**
 * Function for displaying the landing page
 *
 * @function
 * @return {Object} The landing page
 */

const LandingPage = () => (
    <PageLayout
        siderIsPresent={false}
        footerPresent
        isAuthenticated={false}
        title="Home | Welcome to Help me"
    >
        <LandingPageContent
            level={1}
            title="Help me Title"
            paragraphText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti porro vero"
            buttonText="Lets begin this Journey"
            imageIsPresent
            imageLink="../../../static/connected.svg"
            buttonLink="/signup"
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
            buttonLink="/signup"
        />
    </PageLayout>
);

export default LandingPage;
