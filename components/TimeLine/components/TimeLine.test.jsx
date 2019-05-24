import React from 'react';
import ReactDOM from 'react-dom';
import TimeLine from '../index';
import TimeLineOnlineFriends from './TimeLineOnlineFriends';
import TimeLinePopularTopic from './TimeLinePopularTopic';
import TimeLinePosts from './TimeLinePosts';
import TimeLineProfileInfo from './TimeLineProfileInfo';
import { CreatePostComponent, CreatePostButtons, CreatePostInput } from './CreatePostComponent';
import CreatePostModal from './CreatePostModal';

describe('checks Timeline', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLine />, div);
    });
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLineOnlineFriends />, div);
    });
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLinePopularTopic />, div);
    });
    // it('renders without crashing', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.render(<TimeLinePosts />, div);
    // });
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
});
