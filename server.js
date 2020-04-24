// require() = import in python
// allows for this module to access another modules' exports

const express = require('express');            //backend framework
const mongoose = require('mongoose');          //ORM to interact w mongodb
const config = require('config');

const app = express();                         //init our middleware = a series of function calls, to a var         

// Bodyparser middleware                     allows to take requests and read from the body i.e. POST request
app.use(express.json());                   // binds to the returned middle ware that only parses json & only looks at requests where the Content-Type header matches the type option

// DB Config
const db = config.get('mongoURI');        // db = mongoURI

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/Items', require('./routes/api/Items'));               // uses the routes = GET, POST, DELETE   items = refer to that module 
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/guests', require('./routes/api/guests'));
app.use('/api/guestItems', require('./routes/api/guestItems'));
app.use('/api/orders', require('./routes/api/orders'));


const port = process.env.port || 6000;

app.listen(port, () => console.log(`Server started on port ${port}`));



