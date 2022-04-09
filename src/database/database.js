const sqlite3 = require('sqlite3').verbose();
const { response } = require('express');
const md5 = require('md5');
const DBSOURCE = "db.sqlite";
// const fetch = require('node-fetch');
let userLoged;
// let passwordLoged;
let id;
// import fetch from 'node-fetch';
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
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
          // db.run(data, [name, md5(password)]);
          db.run(data, [name, md5(password)], (err) => {
            if (err) {
              let state = "is-invalid";
              res.render('createAccount', { state });
            } else {
              res.redirect('/');
            }
          });
        }
      });
      db.close((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Closed the database connection.');
        }
      })
      // res.redirect('/');
    } catch (error) {
      console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      // let name;
      // let password;
      // if (!userLoged) {
      //   name = req.body.name;
      //   password = req.body.password;
      // } else {
      //   name = userLoged;
      //   password = passwordLoged;
      // }
      let name = req.body.name;
      let password = req.body.password;

      let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          console.log('Connected to the SQLite database');
          let data = 'SELECT name, password, id FROM users WHERE name = ?';
          db.get(data, name, (err, row) => {
            if (err) {
              res.status(400).json({ "error": err.message });
              return;
            }
            if (row == undefined) {
              console.log("User or password doesn't exist.");
              let data = "is-invalid";
              res.render('index', { data })
            } else {
              if (row.name == name && row.password == md5(password)) {
                userLoged = name;
                // passwordLoged = password;
                id = row.id;
                console.log(`${name} succesfully login.`);
                // res.redirect('/agenda');
                let params = [];
                let contactsData = `SELECT contacts.contactId, contacts.name, contacts.lastName, contacts.number FROM users INNER JOIN contacts on users.id = contacts.id WHERE contacts.id = ${id}`;
                db.all(contactsData, params, (err, rows) => {
                  if (err) {
                    res.send(`Hay un problema: ${err}`)
                  } else {
                    console.log(rows);
                    res.render('agenda', { rows });
                  }
                })
              } else {
                console.log("User or password doesn't exist.");
                // res.redirect('/');
                let data = "is-invalid";
                res.render('index', { data });
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
                let state = "";
                let status = "is-invalid";
                res.render('configureAccount', { state, status });
                return;
              } else {
                if (row.name == name && row.password == md5(password)) {
                  id = row.id;
                  db.run('DELETE FROM users WHERE id = ?',
                    id,
                    function(err, result) {
                      if (err) {
                        res.status(400).json({ "error": res.message });
                        db.close();
                        return;
                      }
                      userLoged = '';
                    }
                  )
                  let contactsPUser = 'SELECT id FROM contacts WHERE id = ?';
                  db.get(contactsPUser, id, (err, row) => {
                    if (err) {
                      res.status(400).json({ "error": err.message });
                      db.close();
                      return;
                    }
                    if (row != undefined) {
                      db.run('DELETE FROM contacts WHERE id = ?',
                        id,
                        function(err, res) {
                          if (err) {
                            res.status(400).json({ "error": res.message });
                            db.close();
                            return;
                          }
                        }
                      )
                    }
                  });
                } else {
                  console.log("User or password doesn't exist.");
                  // res.redirect('/api/deleteAccount');
                  let state = "";
                  let status = "is-invalid";
                  res.render('configureAccount', { state, status });
                }
              }
            })

          }
        });
        db.close((err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Databse connection closed.');
            res.redirect('/');
          }
        })
      } else {
        console.log("User or password doesn't exist.");
        // res.redirect('/api/deleteAccount');
        let state = "";
        let status = "is-invalid";
        res.render('configureAccount', { state, status });
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
        newName: req.body.newName,
        newPassword: req.body.newPassword ? md5(req.body.newPassword) : null
      }
      let state = "is-invalid";
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
                res.redirect('/configureAccount');
              } else {
                if (row.name == name && row.password == md5(password)) {
                  id = row.id;
                  db.run('UPDATE users set name = COALESCE(?, name), password = COALESCE(?, password) WHERE id = ? ',
                    [newData.newName, newData.newPassword, id],
                    function(err, res) {
                      if (err) {
                        res.status(400).json({ "error": res.message });
                        db.close();
                        return;
                      }
                      userLoged = '';
                    }
                  )
                  res.redirect('/');
                } else {
                  console.log("User or password doesn't exist.");
                  // res.redirect('/configureAccount');
                  res.render('configureAccount', { state })
                }
              }
            });
            db.close((err) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Databse connection closed.');
                // res.redirect('/');
              }
            })
          }
        });
      } else {
        // console.log("el nombre");
        res.render('configureAccount', { state })
      }
    } catch (error) {
      console.error(error);
    }
  },
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
          let data = 'INSERT INTO contacts (name, lastName, number, id) VALUES(?,?,?,?)';
          db.run(data, [name, lastName, number, id], (err) => {
            if (err) {
              // let state = "is-invalid";
              // res.render('createAccount', { state });
              // res.redirect('/agenda');
              res.send(`Ocurrió un problema: ${err}`)
            } else {
              let params = [];
              let contactsData = `SELECT contacts.contactId, contacts.name, contacts.lastName, contacts.number FROM users INNER JOIN contacts on users.id = contacts.id WHERE contacts.id = ${id}`;
              db.all(contactsData, params, (err, rows) => {
                if (err) {
                  res.send(`Hay un problema: ${err}`)
                } else {
                  // console.log(rows);
                  res.render('agenda', { rows });
                }
              })
            }
          });
          db.close((err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('Databse connection closed.');
            }
          })
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  deleteContact: async (req, res) => {
    try {
      let contactId = req.params.contactId;
      let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          db.run(
            'DELETE FROM contacts WHERE contactId = ?',
            contactId,
            function(err, result) {
              if (err) {
                res.status(400).json({ "error": res.message });
                return;
              } else {
                let params = [];
                let contactsData = `SELECT contacts.contactId, contacts.name, contacts.lastName, contacts.number FROM users INNER JOIN contacts on users.id = contacts.id WHERE contacts.id = ${id}`;
                db.all(contactsData, params, (err, rows) => {
                  if (err) {
                    res.send(`Hay un problema: ${err}`)
                  } else {
                    // console.log(rows);
                    res.render('agenda', { rows });
                  }
                })
              }
            }
          )
        }
      });
      db.close((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Databse connection closed.');
        }
      })
    } catch (error) {
      console.error(error);
    }
  },
  updateContactDB: async (req, res) => {
    try {
      let contactId = req.params.id;
      console.log(`El ID es: ${id}`);
      let data = {
        name: req.body.name,
        lastName: req.body.lastName,
        number: req.body.number,
      }
      console.log(data);
      let db = new sqlite3.Database(DBSOURCE, (err) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          db.run(`UPDATE contacts set name = COALESCE(?, name), lastName = COALESCE(?, lastName), number = COALESCE(?, number) WHERE contactId = ?`,
            [data.name, data.lastName, data.number, contactId],
            function(err, res) {
              if (err) {
                res.status(400).json({ "error": res.message })
                return;
              }
            }
          )
          let params = [];
          let contactsData = `SELECT contacts.contactId, contacts.name, contacts.lastName, contacts.number FROM users INNER JOIN contacts on users.id = contacts.id WHERE contacts.id = ${id}`;
          db.all(contactsData, params, (err, rows) => {
            if (err) {
              res.send(`Hay un problema: ${err}`)
            } else {
              res.render('agenda', { rows });
            }
          })
        }
      });
      db.close((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Databse connection closed.');
        }
      })
    } catch (error) {

    }
  }
}
