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
  }
}
