/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import { Spin } from 'antd';

import { handleAuthentication } from '../utils';
import { SIGNING_IN_TEXT } from '../constants';

class Authentication extends PureComponent {
    componentDidMount() {
        handleAuthentication();
    }

    render() {
        return (
            <div className="loading_Div">
                <Spin tip={SIGNING_IN_TEXT} size="large" />
            </div>
        );
    }
}

export default Authentication;
