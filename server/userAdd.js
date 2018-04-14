
var userService = require('./services/user.service');
var user=require('../client/app/models/user');
/*Sartu hemen erregistratu nahi duzun erabiltzailearen datuak*/

user.username="javi";
user.password="javi";
user.firstName="javi";
user.lastName="castrillo";


userService.create(user)
.then(function () {
  console.log('erabiltzailea ondo sortu da');
})
.catch(function (err) {
    console.log('errorea egon da erabiltzailea sortzean');
});;
