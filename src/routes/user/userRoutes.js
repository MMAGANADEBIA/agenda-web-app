const express = require('express');
// const dataBase = require('../../database/database.js');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const router = express.Router();

const { index, createAccount, agenda, configureAccount } = require('../../controllers/user.js');
const { postData, login, dbDeleteAccount, updateAccount, addContact } = require('../../database/database.js');
// const { addContact } = require('../../database/contacts.js');

//User Routes.
router.get('/', index);
router.get('/createAccount', createAccount);
//router.post('/agenda', urlencodedParser, agenda); //Not in using
router.post('/agenda/configureAccount', configureAccount);
//Api users Database Routes
router.post('/api/database', urlencodedParser, postData);
router.post('/api/login', urlencodedParser, login);
router.post('/api/deleteAccount', urlencodedParser, dbDeleteAccount);
router.post('/api/updateAccount', urlencodedParser, updateAccount);
//Api contacts Database Routes
router.post('/api/addContact', urlencodedParser, addContact);
module.exports = router;
