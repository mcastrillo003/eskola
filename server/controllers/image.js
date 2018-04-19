'use strict'

var path=require('path');
var Image=require('../models/image');

function getImage(req,res){
  var imageId=req.params.id;

  Image.findById(imageId,(err,image)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!image){
        res.status(404).send({message: 'No existe la imagen'});
      }else{
        res.status(200).send({image});
      }
    }
  });
}

function getImages(req,res){

  Image.find({}).exec((err,images)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!images){
        res.status(404).send({message: 'No hay imágenes'});
      }else{
        res.status(200).send({images});
      }
    }
});
}

function saveImage(req,res){
  var imageId=req.params.id;
  var params=req.body;

  var image=new Image();
  image.title=params.title;
  image.picture=null;

  image.save(imageId,(err,imageStored)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!imageStored){
        res.status(404).send({message: 'No se ha guardado la imagen'});
      }else{
        res.status(200).send({image: imageStored});//JSON barruan image propietatea dela espezifikatu
      }
    }

  });

}

function updateImage(req,res){
  //subir fichero y guardar en el disco duro del servidor
  var imageId=req.params.id;
  var update=req.body;

  Image.findByIdAndUpdate(imageId,update,(err,imageUpdated)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!imageUpdated){
        res.status(404).send({message: 'No se ha actualizado la imagen'});
      }else{
        res.status(200).send({image: imageUpdated});//JSON barruan image propietatea dela espezifikatu
      }
    }
  });

}

function deleteImage(req,res){
  var imageId=req.params.id;

  Image.findByIdAndRemove(imageId,(err,imageDeleted)=>{
    if(err){
      res.status(500).send({message: 'Error en la petición'});
    }else{
      if(!imageDeleted){
        res.status(404).send({message: 'No se ha podido eliminar la imagen'});
      }else{
        res.status(200).send({image: imageDeleted});//JSON barruan image propietatea dela espezifikatu
      }
    }

  });

}

function uploadImage(req,res){
  var imageId=req.params.id;
  var file_name='Ez da igo...';

  if(req.files){//vamos a capturar files. req.files-> asi accedemos a los ficheros que nos estan llegando por petición http

    var file_path=req.files.image.path;//path del fichero
    //vamos a separar el path, porque el nombre del fichero se encuentra detras de \\
    var file_split=file_path.split('\\');
    var file_name=file_split[1];//nombre del fichero. es[1] xq es lo que hay detras de \\, osea el segundo indice del array

    Image.findByIdAndUpdate(imageId,{picture: file_name},(err,imageUpdated)=>{
      if(err){
        res.status(500).send({message: 'Error en la petición'});
      }else{
        if(!imageUpdated){
          res.status(404).send({message: 'No se ha actualizado la imagen'});
        }else{
          res.status(200).send({image: imageUpdated});//JSON barruan image propietatea dela espezifikatu
        }
      }
    });

  }else{
    res.status(200).send({message: 'No ha subido ninguna imagen'});
  }

}

var fs=require('fs');//FileSystem paketea kargatu

function getImageFile(req,res){
  var imageFile=req.params.imageFile;//URLtik datorren irudiaren izena hartu
  fs.exists('./uploads/'+imageFile,function(exists){//fitxategi hori disko gogorrean existitzen dela konprobatu
    if(exists){
      res.sendFile(path.resolve('./uploads/'+imageFile));//para enviar un fichero por http
    }else{
      res.status(200).send({message: 'No existe la imagen '});
      //status(404) modura ere jarri daiteke, baina 200jarri dugu errorerik ez emateko
    }

  });




}

module.exports={
  getImage,
  getImages,
  saveImage,
  updateImage,
  deleteImage,
  uploadImage,
  getImageFile
}
