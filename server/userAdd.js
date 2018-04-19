
var userService = require('./services/user.service');
var user=require('../client/app/models/user');
/*Sartu hemen erregistratu nahi duzun erabiltzailearen datuak*/

user.username="begosole";
user.password="begosole";
user.firstName="bego";
user.lastName="zugazaga";
user.lastName2="asolo";
user.description="";
//user.portada="defektuzkoarenId-a sartu"
//user.argazkia="defektuzkoarenId-a sartu"


userService.create(user)
.then(function () {
  console.log('erabiltzailea ondo sortu da');
})
.catch(function (err) {
    console.log('errorea egon da erabiltzailea sortzean');
});;
