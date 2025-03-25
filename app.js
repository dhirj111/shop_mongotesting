const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const { mongoConnect } = require('./util/database'); // Correct import
const mongoose = require('mongoose')
// const User = require('./models/user')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findUserbyID("67d6a499a61ded3cfc4e8e5f")
//     .then(user => {
//       console.log("user her ois     ", user)
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });
// commented out this because curremtly not working with user
// will break application for now

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


//mongodb+srv://drexouser:onlineok@bheruscluster.re32x.mongodb.net/?retryWrites=true&w=majority&appName=bheruscluster

//offlineok
//bherus2dbuser

const uri = 'mongodb+srv://bherus2dbuser:offlineok@bheruscluster.re32x.mongodb.net/shop?retryWrites=true';

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(1000);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });