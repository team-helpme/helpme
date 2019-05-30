import React from 'react';
import './LandingPage.css';
import 'antd/dist/antd.css';
import LandingPageContent from './LandingPageContent';
import PageLayout from '../../Layout';
import { LANDING_PAGE_CONTENTS, PAGE_TITLE } from '../constants';

/**
 * Function for displaying the landing page
 *
 * @function
 * @return {Object} The landing page
 */

const LandingPage = () => (
    <PageLayout
      isSiderPresent={false}
      isFooterPresent
      isAuthenticated={false}
      title={PAGE_TITLE}
    >
        {

            LANDING_PAGE_CONTENTS.map(landingPageContent => {
                const {
                    paragraphText,
                    isButtonPresent,
                    columnSection,
                    isImagePresent,
                    imageLink,
                    level,
                    title,
                    reverseSection,
                    buttonText,
                    buttonLink,
                } = landingPageContent;

                return (
                    <LandingPageContent
                      key={paragraphText}
                      isButtonPresent={isButtonPresent}
                      columnSection={columnSection}
                      isImagePresent={isImagePresent}
                      imageLink={imageLink}
                      level={level}
                      paragraphText={paragraphText}
                      title={title}
                      reverseSection={reverseSection}
                      buttonText={buttonText}
                      buttonLink={buttonLink}
                    />
                );
            })
        }
    </PageLayout>
);

export default LandingPage;
