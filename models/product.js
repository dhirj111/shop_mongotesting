const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {

    type: Number,
    required: true

  },
  description: {

    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}
)

module.exports = mongoose.model('Product', productSchema)

// const mongodb = require('mongodb');
// const { ObjectId } = mongodb;
// const { get } = require('../routes/admin');
// const { getDb } = require('../util/database');

// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     let db = getDb();
//     return db.collection('products').insertOne(this)
//       .then(result => {
//         console.log(result);
//         return result;
//       })
//       .catch(err => {
//         console.log(err);
//         throw err;
//       });
//   }


//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products); // Keep the logging if needed
//         return products; // This crucial line was missing - return the products to the caller
//       })
//       .catch(err => {
//         console.log(err);
//         throw err; // Re-throw the error for proper handling
//       });
//   }


//   static fetchOne(prodId) {
//     console.log("Received model method:", prodId);

//     const db = getDb();

//     return db.collection('products')
//       .find({ _id: new ObjectId(prodId) })  // ✅ Convert prodId to ObjectId
//       .toArray()  // ✅ Convert the cursor to an array
//       .then(products => {
//         console.log(products);
//         return products;  // ✅ Returns an array with one product
//       })
//       .catch(err => {
//         console.log("MongoDB Fetch Error:", err);
//         throw err;  // ✅ Re-throw for better error handling
//       });
//   }

//   static findById(prodId) {

//     const db = getDb();
//     return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(Product => {
//         console.log(Product);
//         return Product;
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
//   static deleteitem(prodId) {
//     let db = getDb();
//     return db.collection('products')  // ✅ Ensure you target the correct collection
//       .deleteOne({ _id: new ObjectId(prodId) })  // ✅ Convert prodId to ObjectId
//       .then(result => {
//         console.log("Deleted Product:", result);
//         return result;
//       })
//       .catch(err => console.log("Error deleting product:", err));
//   }
// }
// module.exports = Product;
