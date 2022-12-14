const { default: mongoose, mongo } = require("mongoose");

const todoSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required: true
    },
    status : {
        type : String,
        required : true
    },
    createdDate : {
        type : Date,
        required : true
    },
    dueDate : {
        type : Date,
        required : true
    },

    priorirty : {
        type : String,
        required : false
    }
})

const todo = mongoose.model('todo', todoSchema)

module.exports = todo