
var userService = require('./services/user.service');
var user=require('../client/app/_models/index');

/*Sartu hemen erregistratu nahi duzun erabiltzailearen datuak*/

user.username="mireiac";
user.password="mireia";
user.firstName="mireia";
user.lastName="castrillo";


userService.create(user)
.then(function () {
  console.log('erabiltzailea ondo sortu da');
})
.catch(function (err) {
    console.log('errorea egon da erabiltzailea sortzean');
});;
