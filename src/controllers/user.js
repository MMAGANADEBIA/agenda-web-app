const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
module.exports = {
  index: async (req, res) => {
    try {
      res.render('index');
    } catch (error) {
      console.error(error);
    }
  },
  createAccount: async (req, res) => {
    try {
      res.render('createAccount');
    } catch (error) {
      console.error(error);
    }
  },
  agenda: async (req, res) => {
    try {
      res.render('agenda');
    } catch (error) {
      console.error(error);
    }
  },
  configureAccount: async (req, res) => {
    try {
      res.render('configureAccount');
    } catch (error) {
      console.error(error);
    }
  }
}
