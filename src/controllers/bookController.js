let bookController = function(Book){

    let createBook = function(req, res){
        let book = new Book(req.body);
        console.log(book);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
            return;
        }

        book.save();
        res.status(201);
        res.send(book);
    };

    let getBooks = function(req, res){
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
    };

    return {
        createBook,
        getBooks,
    }

};

module.exports = bookController;