let express = require('express');
let mongoose = require('mongoose');

let db = mongoose.connect('mongodb://localhost/bookAPI');
let app = express();

let Book = require('./models/bookModel');

// Note that nodemon will set PORT variable when it runs in gulp
let port = process.env.PORT || 3000;

let bookRouter = express.Router();

bookRouter.route('/books')
    .get(function(req, res){
        let query = {};

        // Build query string to pass to mongodb
        if(req.query.genre){
            query.genre = req.query.genre
        }

        Book.find(query, function(err, results){
           if(err){
                console.log(err);
                res.status(500).send(err);
           }else{
                res.json(results);
           }
        });
    });

bookRouter.route('/books/:id')
    .get(function(req, res){

        Book.findById(req.params.id, function(err, result){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(result);
            }
        });
    });

app.use('/api', bookRouter);

app.get('/', function(req, res){
    res.send('Welcome to my API');
});

app.listen(port, function(){
    console.log(`Running on port ${port}`);
});



