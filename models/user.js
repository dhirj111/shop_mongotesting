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
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db
      .collection('user')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  // addToCart(product) {
  //   console.log("product at point 1020 is", product);

  //   // Initialize cart items or use existing ones
  //   const cartItems = this.cart && this.cart.items ? [...this.cart.items] : [];

  //   // Check if product already exists in cart
  //   const existingProductIndex = cartItems.findIndex(
  //     item => item.productId && item.productId.toString() === product._id.toString()
  //   );

  //   if (existingProductIndex >= 0) {
  //     // Increase quantity if product exists
  //     cartItems[existingProductIndex].quantity += 1;
  //   } else {
  //     // Add new product if it doesn't exist
  //     cartItems.push({
  //       productId: new ObjectId(product._id),
  //       quantity: 1
  //     });
  //   }

  //   const updatedCart = { items: cartItems };
  //   const db = getDb();

  //   return db.collection('user').updateOne(
  //     { _id: new ObjectId(this._id) },
  //     { $set: { cart: updatedCart } }
  //   );
  // }
  deleteItemFromCart(productId) {

    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString()
    })
    const db = getDb();
    return db
      .collection('user')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      )
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => {
      return i.productId;

    });
    return db.collection('products').find({ _id: { $in: productIds } }).toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p, quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          }
        })
      })
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