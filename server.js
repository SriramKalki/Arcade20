const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const productRoute = require('./routes/product');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productRoute);

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
