'use strict'

var mongoose=require('mongoose');
var port=process.env.PORT || 4000;

var app=require('./app');

mongoose.connect('mongodb://localhost:27017/eskola',(err,res)=>{
  if(err)
  {
    throw err;
  }else{
    console.log("Datu basea modu egokian lanean dabil");

    app.listen(port,()=>{
      console.log(`Eskolaren API RESTful-a ${port}.portuan lan egiten`);

    });

  }

});
