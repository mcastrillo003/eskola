'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//crear la variable(de tipo JSON) que va a tener nuestro esquema. Egitura bat da
//JSON denez,egitura barruko edukia {} joan behar da
var UserSchema=Schema({
  //_id atributua ere izango du, mongok berez sortzen duelako
  username: String,
  //password:String,
  hash:String,
  firstName:String,
  lastName:String,
  lastName2:String,
  description:String,
  portada: {type: Schema.ObjectId,ref: 'Image'},
  argazkia: {type: Schema.ObjectId,ref: 'Image'}
});

module.exports=mongoose.model('User',UserSchema);
