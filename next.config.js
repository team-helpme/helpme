const withCSS = require('@zeit/next-css');

  module.exports = withCSS(
    {
        env: {
        clientID: 'Jok9xa6Ucl4IgigMnTIMeDiwxiyWNb19',
      }, contentSecurityPolicy: "default-src 'none'; script-src 'self'; style-src 'nonce-{style-nonce}'; connect-src 'self';img-src 'self';"
    }
  )
