var synonyms = require('../Synonyms/WordSynonymsPrototype');
var common = require('../commons');
var config = require('../config/config');
var async = require("async");
var sysno = new synonyms.synonyms(async, common, config, "positive");
sysno.accessMethods(function(err,response){
    if(err){
        console.log(err);
    }
    else{
        console.log(response);
    }
});