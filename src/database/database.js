const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');
const DBSOURCE = "db.sqlite";
let userLoged;
module.exports = {
  postData: async (req, res) => {
    try {
      let name = req.body.name;
      let password = req.body.password;
      let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log('Connected to the SQLite database');
          let data = 'INSERT INTO users (name, password) VALUES(?,?)';
          db.run(data, [name, md5(password)]);
        }
      })
      db.close((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Closed the database connection.');
        }
      })
      res.redirect('/');
    } catch (error) {
      console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      let name = req.body.name;
      let password = req.body.password;
      let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log('Connected to the SQLite database');
          let data = 'SELECT name, password FROM users WHERE name = ?';
          db.get(data, name, (err, row) => {
            if (err) {
              res.status(400).json({ "error": err.message });
              return;
            }
            if (row == undefined) {
              console.log("User or password doesn't exist.");
              res.redirect('/');
            } else {
              if (row.name == name && row.password == md5(password)) {
                console.log(`${name} succesfully login.`);
                userLoged = name;
                res.redirect('/agenda');
              } else {
                console.log("User or password doesn't exist.");
                res.redirect('/')
              }
            }
          })
          db.close((err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Databse connection closed.');
            }
          })
        }
      })
    } catch (error) {
      console.error(error);
    }
  },
  dbDeleteAccount: async (req, res) => {
    try {
      let name = req.body.name;
      let password = req.body.password;
      let id;
      if (name == userLoged) {
        let db = new sqlite3.Database(DBSOURCE, err => {
          if (err) {
            console.error(err);
            throw err;
          } else {
            console.log('Connected to the SQLite database');
            let data = 'SELECT id, name, password FROM users WHERE name = ?';
            db.get(data, name, (err, row) => {
              if (err) {
                res.status(400).json({ "error": err.message });
                return;
              }
              if (row == undefined) {
                console.log("User or password doesn't exist.");
                res.redirect('/api/deleteAccount');
              } else {
                if (row.name == name && row.password == md5(password)) {
                  id = row.id;
                  db.run('DELETE FROM users WHERE id = ?',
                    id,
                    function(err, result) {
                      if (err) {
                        res.status(400).json({ "error": res.message });
                        return;
                      }
                      userLoged = '';
                    }
                  )
                } else {
                  console.log("User or password doesn't exist.");
                  res.redirect('/api/deleteAccount');
                }
              }
            })
            db.close((err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Databse connection closed.');
                res.redirect('/');
              }
            })
          }
        })
      } else {
        console.log("not hello :(");
      }

    } catch (error) {
      console.error(error);
    }
  },
  updateAccount: async (req, res) => {
    try {
      let name = req.body.name;
      let password = req.body.password;
      let newData = {
        name: req.body.newName,
        password: req.body.newPassword ? md5(req.body.newPassword) : null
      }
      if (name = userLoged) {
        let db = new sqlite3.Database(DBSOURCE, err => {
          if (err) {
            console.error(err);
            throw err;
          } else {
            console.log('Connected to the SQLite database');
            let data = 'SELECT id, name, password FROM users WHERE name = ?';
            db.get(data, name, (err, row) => {
              if (err) {
                res.status(400).json({ "error": err.message });
                return;
              }
              if (row == undefined) {
                console.log("User or password doesn't exist.");
                res.redirect('/configureAccount');
              } else {
                if (row.name == name && row.password == md5(password)) {
                  id = row.id;
                  db.run('UPDATE users set name = COALESCE(?, name), password = COALESCE(?, password) WHERE id = ? ',
                    [newData.name, newData.password, id],
                    function(err, result) {
                      if (err) {
                        res.status(400).json({ "error": res.message });
                        return;
                      }
                      userLoged = '';
                    }
                  )
                } else {
                  console.log("User or password doesn't exist.");
                  res.redirect('/configureAccount');
                }
              }
            })
            db.close((err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Databse connection closed.');
                res.redirect('/');
              }
            })
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
