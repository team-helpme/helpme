import React from 'react';

import { unsetToken, logout } from '../../components/Authentication';

export default class SignOff extends React.Component {
    componentDidMount() {
        unsetToken();
        logout();
    }

    render() {
        return null;
    }
}
