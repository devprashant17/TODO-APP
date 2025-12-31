const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    username: String,
    password: String,
    email: {type:String,unique:true,required:true}
})

const todo = new Schema({
    description: String,
    userId: ObjectId
})

const Usermodel = mongoose.model('users',user);
const Todomodel = mongoose.model('todos',todo);

module.exports = {
    Usermodel,
    Todomodel
};