const express = require('express');
const app = express();
const authRoutes = require('./auth/routes');
const orderRoutes = require('./orders/routes');
const mongoose = require('mongoose');
const cors = require('cors')
const configs = require('./config/config');


mongoose.connect(configs.mongo.mongoURL)
.then(resp => {console.log('mongo connected success: ')})
.catch(err => {console.log('error connecting to mongo: ', err)})

app.enable('trust proxy');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);


const PORT = process.env.PORT || '8080';


app.listen(PORT, () => {
    console.log('app started at port 8080')
});
