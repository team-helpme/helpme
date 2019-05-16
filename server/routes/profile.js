const express = require('express');

const router = express.Router();
const Profile = require('../controller/profile.contoller');

// Create a new Profile
router.post('/create', Profile.create);
// Retrieve all profiles
router.get('/all', Profile.findAll);
// Retrieve a single Profile with profileId
router.get('/:profileId', Profile.findOne);
// Update a Profile with profileId
router.put('/:profileId', Profile.update);
// Delete a Profile with profileId
router.delete('/:profileId', Profile.delete);

module.exports = router;
