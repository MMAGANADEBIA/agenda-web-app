const express = require('express');
// const dataBase = require('../../database/database.js');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const router = express.Router();

const { index, createAccount, agenda, configureAccount } = require('../../controllers/user.js');
const { postData, login, dbDeleteAccount, updateAccount } = require('../../database/database.js');

//User Routes.
router.get('/', index);
router.get('/createAccount', createAccount);
router.get('/agenda', agenda);
router.get('/agenda/configureAccount', configureAccount);
//Api Routes
router.post('/api/database', urlencodedParser, postData);
router.post('/api/login', urlencodedParser, login);
router.post('/api/deleteAccount', urlencodedParser, dbDeleteAccount);
router.post('/api/updateAccount', urlencodedParser, updateAccount);

module.exports = router;
