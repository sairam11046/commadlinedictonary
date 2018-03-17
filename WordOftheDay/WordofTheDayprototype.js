function WordOfTheDay(async, common, config, date) {
    this.async = async;
    this.common = common;
    this.config = config;
    this.date = date;
}

WordOfTheDay.prototype.getRequestData = function (callback) {
    var params={
        "date":this.date
    };
    var url="/words.json/wordOfTheDay";
    this.common.requestGetData(this.config, params, url, function (err, responseWordOfDay) {
        if (err) {
            callback(err, null);
        }
        else {
            if (responseWordOfDay.statusCode === 200) {
                callback(null, responseWordOfDay.body);
            }
            else {
                callback(responseWordOfDay.body, null);
            }
        }
    });
};
WordOfTheDay.prototype.getWordOftheDay=function(responseData,callback){
    if(typeof responseData["word"]==="undefined"){
        return callback("no word Found given Date",null);
    }
    return callback(null,responseData["word"]);
};
WordOfTheDay.prototype.accessMethods=function(callback){
    var main=this;
    this.async.waterfall([function(callback){
        main.getRequestData(function(err,responseWord){
            if(err){
                callback(err,null);
            }
            else{
                callback(null,responseWord);
            }
        });
    },function(responseWordofDay,callback){
        main.getWordOftheDay(responseWordofDay,function(err,responseData){
            if(err){
                callback(err,null);
            }
            else{
                callback(null,responseData);
            }
        });
    }],function(err,responseData){
        if(err){
            callback(err,null);
        }
        else{
            callback(null,responseData);
        }
    });
};
exports.wordOftheDay=WordOfTheDay;

