import React from 'react';
import ReactDOM from 'react-dom';
import TimeLineOnlineFriends from './TimeLineOnlineFriends';
import TimeLinePopularTopic from './TimeLinePopularTopic';
import TimeLineProfileInfo from './TimeLineProfileInfo';
import { CreatePostComponent, CreatePostButtons, CreatePostInput } from './CreatePostComponent';
import CreatePostModal from './CreatePostModal';

describe('checks Timeline', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TimeLineOnlineFriends />, div);
});
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TimeLinePopularTopic />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TimeLineProfileInfo />, div);
});
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatePostComponent />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatePostModal />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatePostButtons />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatePostInput />, div);
});
