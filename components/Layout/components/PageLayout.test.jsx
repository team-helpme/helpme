import React from 'react';
import ReactDOM from 'react-dom';
import NavHeader from './NavHeader';
import PageFooter from './PageFooter';
import Sidebar from './Sidebar';
import PageLaout from './index';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavHeader />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageFooter />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar />, div);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageLaout />, div);
});
