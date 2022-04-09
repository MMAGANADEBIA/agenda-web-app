const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');
const DBSOURCE = "db.sqlite";
module.exports = {
  index: async (req, res) => {
    try {
      let data = ""
      res.render('index', { data });
    } catch (error) {
      console.error(error);
    }
  },
  createAccount: async (req, res) => {
    try {
      let state = ""
      res.render('createAccount', { state });
    } catch (error) {
      console.error(error);
    }
  },
  // agenda: async (req, res) => {
  //   try {
  //     // let id = req.body.id;
  //     // console.log(id);
  //     //select * from users inner join contacts on users.id = contacts.id;
  //     // let data = `SELECT contacts.name, contacts.lastName, contacts.number FROM users INNER JOIN contacts on users.id = contacts.id WHERE contacts.id = ${id}`;
  //     res.render('agenda');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  configureAccount: async (req, res) => {
    try {
      let state = ""
      let status = ""
      res.render('configureAccount', { state, status });
    } catch (error) {
      console.error(error);
    }
  },
  updateContact: async (req, res) => {
    try {
      let id = req.params.contactId;
      let data = `SELECT name, lastName, number FROM contacts WHERE contactId = ${id}`;
      let db = new sqlite3.Database(DBSOURCE, err => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          db.get(data, (err, row) => {
            if (err) {
              console.error(err);
            } else {
              res.render('updateContact', { id, row });
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
