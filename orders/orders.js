// const express = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
app.use(bodyParser.json());
const mongoose = require('mongoose');
require("./Order")
const Order = mongoose.model("Order");
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



app.post("/order", (req, res) => {
    var newOrder = {
        CustomerID: req.body.CustomerID,
        BookID: req.body.BookID,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    var order = new Order(newOrder)
    order.save().then(() => {
        res.status(200).json({ message: "a new order is created with success" });
    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
})

app.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        res.json(orders)
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})


app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then((order) => {

        if (order) {
            let CustomerID = order.CustomerID;
            axios.get("http://localhost:5555/customer/" + order.CustomerID)
                .then((response) => {
                    let customerName = response.data.name;
                    axios.get("http://localhost:4545/book/" + order.BookID).then((response) => {
                        let bookTitle = response.data.title                        
                        res.status(200).json({ customerName, bookTitle })                        
                    }).catch(err => res.status(400).json({ err }))
                }).catch(err => {
                    res.status(400).json({ err })
                })
        } else {
            res.status(200).json({order});
        }

    })
})

app.delete("/order/:id", (req, res) => {
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send("successfully deleted the order")
    }).catch(err => {
        if (err) {
            throw err;
        }


    })
})
app.listen('7777', () => {
    console.log("up and running - order service on 7777");
});