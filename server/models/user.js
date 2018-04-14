'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//crear la variable(de tipo JSON) que va a tener nuestro esquema. Egitura bat da (tipo struct stand)
//JSON denez,egitura barruko edukia {} joan behar da
var UserSchema=Schema({
  _id: String,
  username: String,
  password:String,
  firstName:String,
  lastName:String
});

module.exports=mongoose.model('User',UserSchema);
