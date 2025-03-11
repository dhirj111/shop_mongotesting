const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://drexouser:onlineok@mycluster0.re32x.mongodb.net/shop?retryWrites=true'
  )
    .then(client => {
      console.log('Connected!');
      _db =client.db()
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = ()=>{
  if(_db){
    return _db
  }

}

module.exports = getDb
module.exports = mongoConnect;
