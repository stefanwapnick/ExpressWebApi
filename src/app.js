var express = require('express');
var app = express();

// Note that nodemon will set PORT variable when it runs in gulp
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

bookRouter.route('/books')
    .get(function(req, res){
        res.json({hello: 'value'});
    });

app.use('/api', bookRouter);

app.get('/', function(req, res){
    res.send('Welcome to my API');
});

app.listen(port, function(){
    console.log(`Running on port ${port}`);
});



