const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());
require("./Book")
const Book = mongoose.model("Book");
require("dotenv").config();
const uri = process.env.MONGOURI

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.connection.on("connected", () => {
    console.log("Connected " + uri);
})

app.get('/', (req, res) => {
    res.send(" service started");
})

app.post('/book', (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    var book = new Book(newBook)
    book.save().then(() => {
        res.send("A new book created with success");
        console.log("new book created");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.get('/books', (req, res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch(err => {
        if (err) {
            throw err;
        }
    })


})
app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {


        if (book) {
            res.json(book)
        } else {
            res.sendStatus(404);
        }
        res.send(book)
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.delete("/book/:id", (req, res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        console.log(req.param);
        res.send("successfully deleted the book")
    }).catch(err => {
        if (err) {
            throw err;
        }


    })
})

//  app.update('/book/:id' , (req, res))
app.listen(4545, () => {
    console.log('this is our micro service');
});