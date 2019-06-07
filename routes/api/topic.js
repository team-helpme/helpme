const express = require('express');
const passport = require('passport');
const Topic = require('../../models/topics');
const validateInput = require('../../validation/topic');

const router = express.Router();

router.post('/', passport.authenticate('auth0', {
    scope: 'openid email profile',
}), async (req, res) => {
    // destructure req.body
    const {
        author, title, content, tags,
    } = req.body;

    // Validate request
    const { errors, isValid } = validateInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.json({
            message: errors,
            status: 'error',
        });
    }

    // create new topic entry
    const topic = new Topic({
        author,
        content,
        tags,
        title,
    });

    // save topic to database
    try {
        const newTopic = await topic.save();
        return res.json({
            data: { newTopic },
            status: 'success',
        });
    } catch (err) {
        return err;
    }
});

// get all forum topics created

router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find();

        if (!topics) {
            return res.json({
                message: 'no forum topic available',
                status: 'error',
            });
        }

        return res.json({
            data: { topics },
            status: 'success',
        });
    } catch (err) {
        return err;
    }
});

module.exports = router;
