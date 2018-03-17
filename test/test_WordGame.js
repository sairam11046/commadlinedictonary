var wordgame = require('../WordGame/WordGamePrototype');
var common = require('../commons');
var config = require('../config/config');
var async = require('async');
var test = new wordgame.wordGame(async, common, config, "check");
test.getRandomWrods(function (err, response) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(response);
    }
});