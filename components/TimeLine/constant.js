const POPULAR_TOPIC = [
    {
        link: '#',
        text: 'Lorem, ipsum.',
    },
    {
        link: '#',
        text: 'Quaerat, fuga!',
    },
    {
        link: '#',
        text: 'Nemo, odit.',
    },
    {
        link: '#',
        text: 'Aspernatur, harum?',
    },
    {
        link: '#',
        text: 'Pariatur, libero!',
    },
    {
        link: '#',
        text: 'Voluptatem, rerum!',
    },
    {
        link: '#',
        text: 'Placeat, illo!',
    },
    {
        link: '#',
        text: 'Voluptatem, nesciunt?',
    },
];

const SKELETON_PROPS = [{
    active: true,
    avatar: true,
    loading: true,
    paragraph: { rows: 7 },
    title: 'TEST',
}];
let LOADING_SKELETON = [];
for (let i = 0; i < 2; i++) {
    LOADING_SKELETON = [...LOADING_SKELETON, ...SKELETON_PROPS];
}

const USERS_BIO = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellen dusharum odit inventore, iste dignissimos laudantium! Veniam.';

const CREATEPOST_PLACEHOLDER = "What's are you thinking?";
export {
    POPULAR_TOPIC, USERS_BIO, CREATEPOST_PLACEHOLDER, LOADING_SKELETON
};
