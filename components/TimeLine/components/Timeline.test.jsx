import React from 'react';
import ReactDOM from 'react-dom';
import {
    CreatePostInput,
    CreatePostButtons,
    CreatePostComponent
} from './CreatePostComponent';
import CreatePostModal from './CreatePostModal';
import TimeLine from './index';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatePostInput />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatePostButtons />, div);
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
    ReactDOM.render(<TimeLine />, div);
});
