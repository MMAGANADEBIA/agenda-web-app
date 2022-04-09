const express = require('express');
// const dataBase = require('../../database/database.js');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const router = express.Router();

const { index, createAccount, agenda, configureAccount, updateContact } = require('../../controllers/user.js');
const { postData, login, dbDeleteAccount, updateAccount, addContact, deleteContact, updateContactDB } = require('../../database/database.js');
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
router.post('/api/deleteContact/:contactId', urlencodedParser, deleteContact);
router.post('/updateContact/:contactId', urlencodedParser, updateContact);
router.post('/api/updateContact/:id', urlencodedParser, updateContactDB);

module.exports = router;
