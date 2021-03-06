const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

// Configure Passport to use Auth0
const {
    AUTH0_CALLBACK_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN,
} = process.env;
const strategy = new Auth0Strategy(

    {
        callbackURL: AUTH0_CALLBACK_URL || '/auth/signed-in',
        clientID: AUTH0_CLIENT_ID,
        clientSecret: AUTH0_CLIENT_SECRET,
        domain: AUTH0_DOMAIN,
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user

        done(null, profile);
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
