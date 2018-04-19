'use strict'
﻿var config = require('config.json');
//login-eko zerbitzua erabili eta db pasatzeko hau erabili:
var userService = require('services/user.service');
//hemendik aurrera userrekin sortzen ditudan funtzioak dbra pasatzeko hau erabili:
var User=require('../models/user');
//var user=require('../client/app/models/user');
var user=require('C:/wamp/www/curso-node-angular/EskolaLoginOndo/client/app/models/user');
var mongo = require('mongoskin');
var bcrypt = require('bcryptjs');
//....................................................................................
//LOGIN ATALA
function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Erabiltzailea edo pasahitza ez da egokia');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
//....................................................................................

function getUser(req,res){
    var id=req.params.id;
    User.findById(id,(err,user)=>{
        if(err){
          res.status(500).send({message: 'Errorea erabiltzailea eskuratzean'});
        }else{
          if(!user){
              res.status(404).send({message: 'Ez da erabiltzaile hori existitzen'});
          }else{
              res.status(200).send({user: user});
          }
        }
    });
}

function addUser(req,res){
  //username bat baten bakarrik egon daiteke datu basean
    var params=req.body;
    user.username=params.username;
    user.password=params.password;
    user.firstName=params.firstName.toLowerCase();
    user.lastName=params.lastName.toLowerCase();
    user.lastName2=params.lastName2.toLowerCase();
    user.description="";
    //user.portada="defektuzkoarenId-a sartu"
    //user.argazkia="defektuzkoarenId-a sartu"


    userService.create(user)
    .then(function () {
        user.firstName=user.firstName.charAt(0).toUpperCase()+user.firstName.slice(1);
        user.lastName=user.lastName.charAt(0).toUpperCase()+user.lastName.slice(1);
        user.lastName2=user.lastName2.charAt(0).toUpperCase()+user.lastName2.slice(1);
        res.status(200).send({user});
    })
    .catch(function (err) {
        res.status(404).send({message: err});
    });;

}

function deleteUser(req,res){
    var params=req.body;
    var id=req.params.id;


    userService._delete(id)
    .then(function () {
      res.status(200).send({messageOndo: 'Ondo joan da erabiltzailea ezabatzeko prozesua'});
    })
    .catch(function (err) {
        res.status(404).send({messageTxarto: 'Txarto joan da erabiltzailea ezabatzeko prozesua'});
    });;

}

function getByIzena(req,res){
    var sartutakoa=req.params.sartutakoa;
    sartutakoa=decodeURIComponent(sartutakoa).toLowerCase();
    var array=sartutakoa.split(' ');
    var izena=array[0];
    var abizena1=array[1];
    var abizena2=array[2];

    if(izena!=undefined && (abizena1==undefined || abizena1=='')){//abizena1 undefine bada, abizena2 ere
      var find= User.find({'firstName':{$regex: izena}}).sort('firstName');
    }
    if(izena!=undefined && (abizena1!=undefined && abizena1!='') && (abizena2==undefined || abizena2=='')){
      var find= User.find({'firstName':{$regex: izena},'lastName':{$regex: abizena1}}).sort('firstName').sort('lastName');
    }
    if(izena!=undefined && abizena1!=undefined && (abizena2!= undefined && abizena2!='')){
      var find= User.find({'firstName':{$regex: izena},'lastName':{$regex: abizena1},'lastName2':{$regex: abizena2}}).sort('firstName').sort('lastName').sort('lastName2');
    }

    find.exec((err,users)=>{
        if(err){
          res.status(500).send({message: 'Errorea erabiltzaileak eskuratzean'});
        }else{
          if(!users || users==false){
              res.status(404).send({message: 'Ez dago baldintza horietako erabiltzailerik'});
          }else{
              for(var i=0;i<users.length;i++){
                users[i].firstName=users[i].firstName.charAt(0).toUpperCase()+users[i].firstName.slice(1);
                users[i].lastName=users[i].lastName.charAt(0).toUpperCase()+users[i].lastName.slice(1);
                users[i].lastName2=users[i].lastName2.charAt(0).toUpperCase()+users[i].lastName2.slice(1);
              }
              res.status(200).send({users});
          }
        }
    });

}

function updateUser(req,res){
  var id=req.params.id;
  var update=req.body;
  if(update.firstName){
    update.firstName=update.firstName.toLowerCase();
  }
  if(update.lastName){
    update.lastName=update.lastName.toLowerCase();
  }
  if(update.lastName2){
    update.lastName2=update.lastName2.toLowerCase();
  }
  if (update.password) {

    console.log('sartzen da update password-en');
      update.hash = bcrypt.hashSync(update.password, 10);
      console.log('hash: '+update.hash);
  }

  User.findByIdAndUpdate(id,update,(err,updatedUser)=>{
    if(err){
      res.status(500).send({message: 'Errorea erabiltzailea eskuratzean'});
    }else{
      if(!updatedUser){
        res.status(404).send({message: 'Ezin izan da erabiltzailea eguneratu'});
      }else{
          updatedUser.firstName=updatedUser.firstName.charAt(0).toUpperCase()+updatedUser.firstName.slice(1);
          updatedUser.lastName=updatedUser.lastName.charAt(0).toUpperCase()+updatedUser.lastName.slice(1);
          updatedUser.lastName2=updatedUser.lastName2.charAt(0).toUpperCase()+updatedUser.lastName2.slice(1);
          res.status(200).send({user: updatedUser});
      }
    }
  });


}


module.exports={
    authenticate,
    getAll,
    getCurrent,
    update,
    addUser,
    deleteUser,
    getByIzena,
    updateUser,
    getUser,
    _delete
}
