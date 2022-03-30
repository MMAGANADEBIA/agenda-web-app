const express = require('express');
const user = require('./user/userRoutes.js');
const router = express.Router();
router.use('/', user);
module.exports = router;
