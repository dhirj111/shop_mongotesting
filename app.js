const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const { mongoConnect } = require('./util/database'); // Correct import
const mongoose = require('mongoose')
// const User = require('./models/user')
const app = express();
const User = require('./models/user')
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//67e28cbc4ba4915986d91b6e


app.use((req, res, next) => {
  User.findById('67e2b2ef54db47d5ede8dc29')
    .then(user => {
      req.user = user;
      console.log("in app.js req.user contains =" ,user)
      next();
    })
    .catch(err => {
      console.log(err)
    });

});

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

mongoose
  .connect(uri)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(1000);
  })
  .catch(err => {
    console.log(err);
  });