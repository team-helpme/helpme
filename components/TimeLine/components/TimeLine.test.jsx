import React from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './index';

describe('checks Timeline', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TimeLine />, div);
    });
});
