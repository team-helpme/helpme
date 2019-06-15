import 'antd/dist/antd.css';
// import './LandingPage.css';
import {
    authorize, logout, parseHash, getBaseUrl
} from './auth0';
import Authentication from './Authentication';

export {
    authorize, logout, parseHash,
    getBaseUrl, Authentication
};
