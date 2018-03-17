function WordGame(async,common,config,word){
    this.async=async;
    this.commmon=common;
    this.config=config;
    this.word=word;
}
WordGame.prototype.getRandomWrods=function(callback){
    var params={"word":this.word};
    var url="/words.json/randomWords";
  this.commmon.requestGetData(this.config,params,url,function(err,response){
      if(err){
          callback(err,null);
      }
      else{
          if(response.statusCode===200){
              callback(null,response.body);
          }
          else{
              callback(response.body,null);
          }
      }
  })
};
exports.wordGame=WordGame;