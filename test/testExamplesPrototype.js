var examples=require('../Examples/WordExamplesPrototype');
var commons=require('../commons');
var config=require('../config/config');
var async=require('async');
var test=new examples.examples(async,commons,config,"positive");
test.accessMethods(function(err,response){
    if(err){
        console.log(err);
    }
    else{
        console.log(response);
    }
});