var dayword=require('../WordOftheDay/WordofTheDayprototype');
var commons=require('../commons');
var config=require('../config/config');
var async=require('async');
var test=new dayword.wordOftheDay(async,commons,config,"2017-19-21");
test.accessMethods(function(err,word){
    if(err){
        console.log(err);
    }
    else{
        console.log(word);
    }
});