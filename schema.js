const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },  
    entrie : {
        type: Number,
        default: 0,
    } ,
    joined:{
        type: String,
        date: new Date()
    }
  });
  
  const UserModel = mongoose.model('User', userSchema);
  
  module.exports = UserModel;