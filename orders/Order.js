const mongoose = require ('mongoose')

mongoose.model('Order' , {
    CustomerID:{
        type: mongoose.SchemaTypes.ObjectID,
        required: true
    },
    BookID:{
        type: mongoose.SchemaTypes.ObjectID,
        required : true
    },
    initialDate:{
        type: Date,
        required: true
    },
    deliveryDate:{
        type: Date,
        required: true
    },
    })
