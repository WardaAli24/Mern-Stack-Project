// server.js
const express = require('express');
const bodyParser = require('body-parser');  //middleware for parsing incoming request bodies in Express.js
const cors = require('cors');   //Cross-Origin Resource Sharing
const mongoose = require('mongoose');   //   library for MongoDB and Node.js

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Blog_Database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes for Users
app.get('/api/users', (req, res) => {   // users list 
  User.find().then(item => {
    console.log(item);
    res.status(200).json({ message: 'Item fetched successfully', data: item, });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.get('/api/users/:id', (req, res) => {       // specific user 
  const { id } = req.params;
  User.find({_id:id}).then(item => {
    console.log(item);
    res.status(200).json({ message: 'Item fetched successfully', data: item, });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.post('/api/users', (req, res) => {      // all products
  const newUser = new User(req.body);
  console.log(newUser);
  newUser.save().then(item => {
    console.log(item);
    res.status(201).json({ message: 'Item added successfully' });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.put('/api/users/:id', (req, res) => {      // specifc product
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true }).then(item => {
    console.log(item);
    res.status(203).json({ message: 'Item Fetched Successfully', data:item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id).then(item => {
    console.log(item);
    res.status(203).json({ message: 'Item Fetched Successfully', data:item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

// Routes for Products
app.get('/api/products', (req, res) => {
  Product.find().then(item => {
    console.log(item);
    res.status(201).json({ message: 'Products Fetched Successfully!', data: item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  Product.find({_id:id}).then(item => {
    console.log(item);
    res.status(200).json({ message: 'Item fetched successfully', data: item, });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.post('/api/products', (req, res) => {     // create
  const newProduct = new Product(req.body);
  newProduct.save().then(item => {
    console.log(item);
    res.status(201).json({ message: 'Item added successfully' });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.put('/api/products/:id', (req, res) => {          // update 
  const { id } = req.params;
  Product.findByIdAndUpdate(id, req.body, { new: true }).then(item => {
    console.log(item);
    res.status(203).json({ message: 'Item Fetched Successfully', data:item });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndRemove(id).then(item => {
    res.status(203).json({ message: 'Deleted Successfully' });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    });
});


//Schema refers to the structure within a database
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });
//Timestamps -> Mongoose automatically adds two fields to the schema: createdAt and updatedAt

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Add routes for CRUD operations for users and products here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});