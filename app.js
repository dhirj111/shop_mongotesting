const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const { mongoConnect } = require('./util/database'); // Correct import
console.log(mongoConnect, " is mongoConnect")

const User = require('./models/user')
console.log(User)
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findUserbyID("67d6a499a61ded3cfc4e8e5f")
    .then(user => { 
      req.user = user;
      console.log(req.user , "req.user")
      console.log("4545" ,req.user , " 4545")
      next();  // Move next() inside the then() block
    })
    .catch(err => {console.log(err)
      next();
    });
  
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(1000, () => {
    console.log('Server is running on port 1000');
  });
});
