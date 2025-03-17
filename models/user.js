const mongodb = require('mongodb');
const { ObjectId } = mongodb;
const { get } = require('../routes/admin');
const { getDb } = require('../util/database');

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  save() {
    let db = getDb();
    return db.collection('user').insertOne(this)
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  static findUserbyID(userId) {
    let db = getDb();

    return db.collection('user').findOne({ _id: new ObjectId(userId) })
  }
}

module.exports = User;