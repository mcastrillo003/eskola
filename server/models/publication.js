'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//crear la variable(de tipo JSON) que va a tener nuestro esquema. Egitura bat da (tipo struct stand)
//JSON denez,egitura barruko edukia {} joan behar da
var PublicationSchema=Schema({
  //_id atributua ere izango du, mongok berez sortzen duelako
  izenburua:String,
  iruzkinak:[String],
  gustuko:{type: [Schema.ObjectId],ref: 'User'},
  azalpena:String,
  urtea:String,
  hilabetea:String,
  eguna:String,
  data:String,
  mota:String,//argitalpena,foro edo eginbeharra den desberdintzeko
  sortzailea: {type: Schema.ObjectId,ref: 'User'}
});

module.exports=mongoose.model('Publication',PublicationSchema);
