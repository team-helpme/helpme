// The code above makes a request to Auth0 server to initiate and authorize a user.

const getAuth0 = options => {
    const config = require('../../../.env');
    const auth0 = require('auth0-js');

    return new auth0.WebAuth({
        clientID: config.AUTH0_CLIENT_ID,
        domain: config.AUTH0_CLIENT_DOMAIN,
    });
};

export const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`;

const getOptions = container => ({
    redirectUri: `${getBaseUrl()}/auth/signed-in`,
    responseType: 'token id_token',
    scope: 'openid profile email',
});

export const authorize = () => getAuth0().authorize(getOptions());

export const logout = () => getAuth0().logout({ returnTo: getBaseUrl() });

export const parseHash = callback => getAuth0().parseHash(callback);
