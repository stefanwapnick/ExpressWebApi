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

    // Using middleware to fetch book before other routes
    bookRouter.use('/:id', function(req, res, next){
        Book.findById(req.params.id, function(err, book){
            if(err){
                res.status(500).send(err);
            }else if(book){
                req.book = book;
                next();
            }else{
                res.status(404).send('Resource could not be found.');
            }
        });
    });
    bookRouter.route('/:id')
        .get(function(req, res){
            res.json(req.book);
        })
        .put(function(req, res){
            let book = req.book;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(book);
            });
        })
        .patch(function(req, res){

            let book = req.book;

            // In this example we just loop through all properties of request body json object
            for(let p in req.body){
                if(p === '_id') continue;
                book[p] = req.body[p];
            }

            book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(book);
            });
        })
        .delete(function(req, res){
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.status(204);
            });
        });
};

module.exports = routeFactory;