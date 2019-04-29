import React from 'react';

import { authorize } from '../../components/Authentication';

class SignIn extends React.Component {
    componentDidMount() {
        authorize();
    }

    render() {
        return <p>loading ....</p>;
    }
}

export default SignIn;
