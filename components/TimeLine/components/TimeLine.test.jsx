import React from 'react';
import ReactDOM from 'react-dom';
import {
    CreatePostInput,
    CreatePostButtons,
    CreatePostComponent
} from './CreatePostComponent';
import CreatePostModal from './CreatePostModal';
import TimeLinePopularTopic from './TimeLinePopularTopic';
import TimeLineOnlineFriends from './TimeLineOnlineFriends';
import TimeLineProfileInfo from './TimeLineProfileInfo';
import TimeLine from './index';

describe('All components in the Timeline component', () => {
    it('CreatePostInput should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreatePostInput />, div);
    });

    it('CreatePostButtons should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreatePostButtons />, div);
    });

    it('CreatePostComponent should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreatePostComponent />, div);
    });

    it('CreatePostModal should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreatePostModal />, div);
    });

    it('TimeLinePopularTopic should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLinePopularTopic />, div);
    });

    it('TimeLineOnlineFriends should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLineOnlineFriends />, div);
    });

    it('TimeLineProfileInfo should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLineProfileInfo />, div);
    });

    it('TimeLine should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLine />, div);
    });
});
