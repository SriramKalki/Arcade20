const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');

const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => res.send('E-commerce API Service'));
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use('/products', productRoute);
app.use('/orders', orderRoute);
