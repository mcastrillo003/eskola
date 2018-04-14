'use strict'
﻿require('rootpath')();
//Express zerbitzariaren konfigurazioa, carga de rutas
var express = require('express');
//cargar la aplicacion de Express
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

//carga de rutas
var user_routes=require('./routes/user');

//parsear las peticiones que nos vienen por JSON en objeto JavaScript
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate'] })); //hemendik agian register ezabatu behar da

/* Hau oraindik ez dugu behar

  //configurar cabeceras-->middleware
  //gure middlewarea sortu errorerik ez gertatzeko konbertsioetan. Zerbitzari ezberdinen artean errekurtsoak partekatu ahal izateko
  app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');//*=edozein. Hortaz, edozeinek izan ahalko du sarbidea
  res.header('Access-Control-Allow-Headers','X-API-KEY,Origin,X-Repuested-With,Content-Type,Accept,Access-Control-Request-Method');

  //metodos http que pueden utilizarse en el Api=Los metodos que nos pueden llegar
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
  res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

  next();//tenemos que lanzar la funcion next para que se salga de esta funcion
});
*/

// routes. Configurar controladores y rutas base
app.use('/users', user_routes);


// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
