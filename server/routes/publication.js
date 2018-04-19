'use strict'
var express=require('express');
var PubliController=require('../controllers/publication');

var api=express.Router();

api.get('/publication/:id',PubliController.getPublication);
api.get('/argitalpenak',PubliController.getArgitalpenak);
api.get('/eginbeharrak',PubliController.getEginbeharrak);
api.get('/foroak',PubliController.getForoak);
api.post('/argitalpena/:id',PubliController.createArgitalpena);
api.post('/eginbeharra/:id',PubliController.createEginbeharra);
api.post('/foroa/:id',PubliController.createForoa);
api.put('/argitalpena/:id',PubliController.updateArgitalpena);
api.put('/eginbeharra/:id',PubliController.updateEginbeharra);
api.put('/foroa/:id',PubliController.updateForoa);
api.put('/gustukoDut/:id',PubliController.addGustukoDut);
api.delete('/gustukoDut/:id',PubliController.deleteGustukoDut);


module.exports=api;
