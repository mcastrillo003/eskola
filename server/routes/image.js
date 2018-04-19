'use strict'

var express=require('express');
var ImageController=require('../controllers/image');

var api=express.Router();

var multipart=require('connect-multiparty');

//middleware. Mediante esto se van a guardar los ficheros que se suban en el directorio uploads
var multipartMiddleware=multipart({uploadDir: './uploads'});


api.get('/image/:id',ImageController.getImage);
api.get('/images',ImageController.getImages);
api.post('/image',ImageController.saveImage);
api.put('/image/:id',ImageController.updateImage);
api.delete('/image/:id',ImageController.deleteImage);
api.post('/upload-image/:id',multipartMiddleware,ImageController.uploadImage);
//se va a ejecutar el multipartMiddleware antes que nada y va a guardar los ficheros que le lleguen y luego se ejecutara el metodo uploadImage de ImageController
api.get('/get-image/:imageFile',multipartMiddleware,ImageController.getImageFile);

module.exports=api;
