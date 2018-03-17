var definition=require('../Defination/WordDefinationPrototype');
var common=require('../commons');
var config=require('../config/config');
var async=require('async');
// http://api.wordnik.com:80/v4/word.json/checking/definitions?limit=200&includeRelated=false&useCanonical=false&
// includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5
var testdefinition=new definition.definition(async,"arun",common,config);
testdefinition.accessMethods(function(err,response){
    if(err){
        console.log(err);
    }
    else{
        console.log(typeof(response),response.length);
        for(var eachDef=0;eachDef<response.length;eachDef++){
            console.log(response[eachDef]);
        }
    }
});
