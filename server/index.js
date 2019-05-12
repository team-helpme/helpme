const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Configure DB
nextApp.prepare().then(() => {
    // express code here
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get(
        '*',
        // next should handle all other routes except the ones specified.
        (req, res) => handle(req, res)
    );

    app.listen(PORT, err => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log(`ready at http://localhost:${PORT}`);
    });
});
