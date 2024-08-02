const express = require('express');
const app = express();
const authRoutes = require('./auth/routes');
const orderRoutes = require('./orders/routes');
const mongoose = require('mongoose');
const cors = require('cors')
const configs = require('./config/config');
const config = require('./config/config');
const responseHandler = require('./utils/responseHandler');


mongoose.connect(configs.mongo.mongoURL)
.then(resp => {console.log('mongo connected success: ')})
.catch(err => {console.log('error connecting to mongo: ', err)})

app.enable('trust proxy');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/health', (req, res) => {
    res.status(200).json({message: 'server up and running'})
})

app.get('/config', (req, res) => {
    try {
        const result = config.google;
        responseHandler.successResponse(res, {
            statusCode: 200,
            data: result,
            message: 'Success'
        });
    } catch (error) {
        responseHandler.errorResponse(res, {
            statusCode: error?.statusCode || 500,
            data: error?.data || error,
            message: 'Failed'
        });
    }
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/configs', orderRoutes);


const PORT = process.env.PORT || '8080';


app.listen(PORT, () => {
    console.log('app started at port 8080')
});
