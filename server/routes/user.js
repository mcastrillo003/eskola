'use strict'
var express = require('express');
var userService = require('services/user.service');
var UserController=require('../controllers/user.controller');
var router = express.Router();

// routes
router.post('/authenticate', UserController.authenticate);
router.get('/', UserController.getAll);
router.get('/current', UserController.getCurrent);
router.put('/:_id', UserController.update);
router.delete('/:_id', UserController._delete);

module.exports = router;
