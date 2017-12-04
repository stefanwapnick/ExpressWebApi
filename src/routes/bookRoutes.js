let express = require('express');

var routeFactory = function(Book){

    let bookRouter = express.Router();

    bookRouter.route('/')
        .post(function(req, res){
            let book = new Book(req.body);
            console.log(book);
            book.save();
            res.status(201).send(book);
        })
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

    bookRouter.route('/:id')
        .get(function(req, res){

            Book.findById(req.params.id, function(err, result){
                if(err){
                    res.status(500).send(err);
                }else{
                    res.json(result);
                }
            });
        });
};

module.exports = routeFactory;