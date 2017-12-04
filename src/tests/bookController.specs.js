let should = require('should');
let sinon = require('sinon');

describe('Book controller tests', function(){

    describe('Create book', function(){
        it('should not allow empty title on creation', function () {

            // Arrange
            let BookMock = function(book){
                this.save = function(){}
            };

            let req = {
                body: {
                    author: 'Jon'
                }
            };

            let res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            let bookController = require('../controllers/bookController')(BookMock);

            // Act
            bookController.createBook(req, res);

            // Assert
            res.status.calledWith(400).should.equal(true, 'Bad status. All arguments recorded: ' + res.status.args);
            res.send.calledWith('Title is required').should.equal(true, 'Unexpected title. All arguments recorded: ' + res.send.args);

        });
    });

});
