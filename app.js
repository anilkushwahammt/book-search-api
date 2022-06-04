// imports
const express = require('express');

const bookRouter = require('./src/routes/book.route');


// constants
const app = express();



// routes
app.get('/', (req, res) => {
    res.send('book search api is up and running...');
});

app.use('/book', bookRouter);


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
app.listen(8000, () => {
    console.log(`server running at port 8000...`);
});

