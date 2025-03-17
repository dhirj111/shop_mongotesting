const mongodb = require('mongodb');
const { ObjectId } = mongodb;
const { get } = require('../routes/admin');
const { getDb } = require('../util/database');

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart; //contains object with items array as {item:[.,.,.,]}
    this._id = id;
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
  addToCart(product) {
    console.log("product at point 1020 is", product);

    // Initialize cart items or use existing ones
    const cartItems = this.cart && this.cart.items ? [...this.cart.items] : [];

    // Check if product already exists in cart
    const existingProductIndex = cartItems.findIndex(
      item => item.productId && item.productId.toString() === product._id.toString()
    );

    if (existingProductIndex >= 0) {
      // Increase quantity if product exists
      cartItems[existingProductIndex].quantity += 1;
    } else {
      // Add new product if it doesn't exist
      cartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1
      });
    }

    const updatedCart = { items: cartItems };
    const db = getDb();

    return db.collection('user').updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }
  static findUserbyID(userId) {
    const db = getDb();
    return db
      .collection('user')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user, "  as user from user model 8989898");
        return user;
      })
      .catch(err => {
        console.log(err, " from user model 8989898");
      });
  }
}

module.exports = User;