let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/bookAPI');
let app = express();

let Book = require('./models/bookModel');
let bookRouter = require('./routes/bookRoutes')(Book);

// Note that nodemon will set PORT variable when it runs in gulp
let port = process.env.PORT || 3000;

// Middleware
// -------------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);

app.get('/', function(req, res){
    res.send('Welcome to my API');
});

app.listen(port, function(){
    console.log(`Running on port ${port}`);
});



