const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');
const DBSOURCE = "db.sqlite";
module.exports = {
  addContact: async (req, res) => {
    try {
      let name = req.body.name;
      let lastName = req.body.lastName;
      let number = req.body.number;
      let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log('Connected to the SQLite database');
          let data = 'INSERT INTO contacts (name, lastName, number) VALUES(?,?,?)';
          db.run(data, [name, lastName, md5(number)], (err) => {
            if (err) {
              // let state = "is-invalid";
              // res.render('createAccount', { state });
              res.redirect('/agenda');
            } else {
              res.redirect('/agenda');
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
