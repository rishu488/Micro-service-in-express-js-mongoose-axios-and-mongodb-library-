const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
const mongoose = require('mongoose');
require("./Customer")
const Customer = mongoose.model("Customer");
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




app.post("/customer", (req, res) => {

    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    var customer = new Customer(newCustomer)
    customer.save().then(() => {
        res.send("a new customer is created with success");
        res.send("customer created");

    }).catch((err) => {
        if (err) {
            throw err;
        }
    })
    res.send("a new customer is created with success");
})


app.get('/customers', (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers)
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})


app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            console.log(customer);
            res.json(customer)
        } else {
            res.sendStatus(404);
        }
        // res.send(customer)
    }).catch(err => {
        res.status(400).json({err})
    })
})

app.delete("/customer/:id", (req, res) => {
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send("successfully deleted the customer")
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})
app.listen('5555', () => {
    console.log("up and running - customer service on 5555");
});