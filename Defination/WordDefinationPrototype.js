function Defination(async,word,common,config){
    this.async=async;
    this.word=word;
    this.common=common;
    this.config=config;
}
Defination.prototype.getRequestData=function(callback){
    var params={
        "word":this.word,
        "limit":200,
        "partOfSpeech":"",
        "includeRelated":false,
        "sourceDictinoaries":"",
        "useCanonical":false,
        "includeTags":false
    };
    var url="/word.json/"+this.word+"/definitions";
    this.common.requestGetData(this.config,params,url,function(err,responseDefination){
        if(err){
            callback(err,null);
        }
        else{
            if(responseDefination.statusCode===200){
                // console.log(responseDefination.body);
                callback(null,responseDefination.body);
            }
            else{
                // console.log(responseDefination.statusCode,responseDefination.body);
                callback(responseDefination.statusCode,null);
            }
        }
    });
};
Defination.prototype.validateData=function(response,callback){
if(response.length===0){
    return callback("No words Found",null);
}
var totalDefinitions=[];
for(var eachDefinition=0;eachDefinition<response.length;eachDefinition++){
    if(response[eachDefinition]["text"]){
        totalDefinitions.push(response[eachDefinition]["text"]);
    }
}
return callback(null,totalDefinitions);
};
Defination.prototype.accessMethods=function(callback){
    var main=this;
    this.async.waterfall([function(callback){
     main.getRequestData(function(err,responseData){
         if(err){
             callback(err,null);
         }
         else{
            callback(null,responseData);
         }
     });
 },function(responseDefinition,callback){
        main.validateData(responseDefinition,function(err,definionArray){
            if(err){
                callback(err,null);
            }
            else{
                callback(null,definionArray)
            }
        });
    }],function(err,definitions){
        if(err){
            callback(err,null);
        }
        else{
            callback(null,definitions);
        }
    })
};
exports.definition=Defination;
