var request=require('request');
exports.requestGetData=function(config,params,requireUrl,callback){
    request({
        "headers":{"content-type":"application/json","api_key":config.api_key},
        "url":config.requestUrl+requireUrl,
        "json":true,
        "body":params
    },function(err,response){
        if(err){
            callback(err,null);
        }
        else{
            callback(null,response)
        }
    });
};