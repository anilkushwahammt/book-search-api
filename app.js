// imports
const express = require('express');
const bookRouter = require('./src/routes/book.route');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;



/**
 * All Routes for incoming API request are defined and mapped here
 */
app.get('/', (req, res) => {   //Default URI mapping to communicate the our Service is Up and Running
    res.send('Book Search Service is Up and Running');
});
app.use('/book', bookRouter);  //All book related requests are routed to bookRouter


// handle errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Internal server error'
        }
    });
});

// start the server
app.listen(PORT, () => {
    console.log(`server running at port ${PORT} ...`);
});


module.exports = { app }