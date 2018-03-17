var atonums = require('../Antonyms/WordAtonymsPrototype');
var common = require('../commons');
var config = require('../config/config');
var async = require('async');
var check = new atonums.antonyms(async, common, config, "positive");
check.accessMethods(function (err, responseData) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(responseData)
    }
});