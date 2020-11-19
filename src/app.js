const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const errorsMap = require('./errors/error.route');
const userRoute = require('./routes/user.route');

// --------- DB Config -------- //
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', (db=process.env.MONGO_DB) => {
    console.log(`Connected to the database: ${db}`);
});
mongoose.connection.on('error', (error) => {
    console.log(`Failed to connected to the database: ${error}`);
});


// --------- Middlewares -------- //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------- Routes -------- //
app.use('/api', userRoute);

// --------- Errors -------- //
app.use(errorsMap.notFound);
app.use(errorsMap.errorUrl);


module.exports = app;