'use strict'
var express = require('express');
var userService = require('services/user.service');
var UserController=require('../controllers/user.controller');
var router = express.Router();

// routes
router.post('/authenticate', UserController.authenticate);
router.get('/', UserController.getAll);
router.get('/current', UserController.getCurrent);
router.get('/byIzena/:sartutakoa', UserController.getByIzena);
router.get('/:id', UserController.getUser);
//router.put('/:_id', UserController.update);
router.put('/:id', UserController.updateUser);
router.delete('/:_id', UserController._delete);
router.post('/add',UserController.addUser);
router.delete('/delete/:id',UserController.deleteUser);
module.exports = router;
