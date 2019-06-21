const STRING = {
    LANDING_PAGE_LEVEL_2_BUTTON_TEXT: 'Lets begin this Journey',
    LANDING_PAGE_LEVEL_2_PARAGRAPH_TEXT: `Hitch a ride. Say goodbye to the rollercoaster of
    depression. Let’s help bring out of you who you truly are`,
    LANDING_PAGE_LEVEL_3_CONTENT_TITLE: 'Connect all Over the Globe',
    LANDING_PAGE_LEVEL_3_PARAGRAPH_TEXT: `Either with the neighbor next door,  or with another at
    the end of the globe,  hookup with friends regardless of color or race, share moments,
    find a shoulder to lean on`,
    LANDING_PAGE_LEVEL_4_CONTENT_TITLE: 'Find Social Groups ',
    LANDING_PAGE_LEVEL_4_PARAGRAPH_TEXT: `Share study materials, therapist contacts and escape
    strategies with your socialgroup, grow together with your community`,
    LANDING_PAGE_LEVEL_5_BUTTON_TEXT: 'Create an Account',
    LANDING_PAGE_LEVEL_5_CONTENT_TITLE: 'Connect, Share, Support',
    LANDING_PAGE_LEVEL_5_PARAGRAPH_TEXT: `A person's happiness is related to the happiness of
    their friends, their friends' friends, and their mutual friends—that is, to people
    well beyond their social horizon. Keep in your circle friends that help you find happiness`,
    LANDING_PAGE_MAIN_CONTENT_BUTTON_TEXT: 'Lets begin this Journey',
    LANDING_PAGE_MAIN_CONTENT_PARAGRAPH_TEXT: `Helpme connects you with friends all over the globe,
    people who understands what you're going through and can relate to your struggles`,
    LANDING_PAGE_MAIN_CONTENT_TITLE: 'Network, Find Happiness ',
    PAGE_TITLE: 'Home | Welcome to Help me', // the title of the landing page
    SIGNUP: '/signup',
};

const {
    LANDING_PAGE_MAIN_CONTENT_BUTTON_TEXT,
    LANDING_PAGE_MAIN_CONTENT_PARAGRAPH_TEXT,
    LANDING_PAGE_MAIN_CONTENT_TITLE,
    LANDING_PAGE_LEVEL_2_PARAGRAPH_TEXT,
    LANDING_PAGE_LEVEL_2_BUTTON_TEXT,
    LANDING_PAGE_LEVEL_3_PARAGRAPH_TEXT,
    LANDING_PAGE_LEVEL_3_CONTENT_TITLE,
    LANDING_PAGE_LEVEL_4_PARAGRAPH_TEXT,
    LANDING_PAGE_LEVEL_4_CONTENT_TITLE,
    LANDING_PAGE_LEVEL_5_BUTTON_TEXT,
    LANDING_PAGE_LEVEL_5_PARAGRAPH_TEXT,
    LANDING_PAGE_LEVEL_5_CONTENT_TITLE,
} = STRING;

const LANDING_PAGE_CONTENTS = [
    {
        buttonLink: '/signup',
        buttonText: LANDING_PAGE_MAIN_CONTENT_BUTTON_TEXT,
        columnSection: false,
        imageLink: '../../../static/connected.svg',
        isButtonPresent: true,
        isImagePresent: true,
        level: 1,
        paragraphText: LANDING_PAGE_MAIN_CONTENT_PARAGRAPH_TEXT,
        reverseSection: false,
        title: LANDING_PAGE_MAIN_CONTENT_TITLE,
    },
    {
        buttonLink: '',
        buttonText: '',
        columnSection: true,
        imageLink: '../../../static/smile.svg',
        isButtonPresent: false,
        isImagePresent: true,
        level: 2,
        paragraphText: LANDING_PAGE_LEVEL_2_PARAGRAPH_TEXT,
        reverseSection: false,
        title: LANDING_PAGE_LEVEL_2_BUTTON_TEXT,
    },
    {
        buttonLink: '',
        buttonText: '',
        columnSection: false,
        imageLink: '../../../static/community.svg',
        isButtonPresent: false,
        isImagePresent: true,
        level: 3,
        paragraphText: LANDING_PAGE_LEVEL_3_PARAGRAPH_TEXT,
        reverseSection: true,
        title: LANDING_PAGE_LEVEL_3_CONTENT_TITLE,
    },
    {
        buttonLink: '',
        buttonText: '',
        columnSection: false,
        imageLink: '',
        isButtonPresent: false,
        isImagePresent: false,
        level: 3,
        paragraphText: LANDING_PAGE_LEVEL_4_PARAGRAPH_TEXT,
        reverseSection: true,
        title: LANDING_PAGE_LEVEL_4_CONTENT_TITLE,
    },
    {
        buttonLink: '/signup',
        buttonText: LANDING_PAGE_LEVEL_5_BUTTON_TEXT,
        columnSection: false,
        imageLink: '../../../static/hangout.svg',
        isButtonPresent: true,
        isImagePresent: true,
        level: 3,
        paragraphText: LANDING_PAGE_LEVEL_5_PARAGRAPH_TEXT,
        reverseSection: false,
        title: LANDING_PAGE_LEVEL_5_CONTENT_TITLE,
    },
];

export {
    STRING,
    LANDING_PAGE_CONTENTS
};
