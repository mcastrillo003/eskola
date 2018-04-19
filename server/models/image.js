'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ImageSchema=Schema({
  //_id atributua ere izango du, mongok berez sortzen duelako
  title: String,
  picture: String//irudi izena gordeko da hemen. Adb: irudia.png
});

module.exports=mongoose.model('Image',ImageSchema);
