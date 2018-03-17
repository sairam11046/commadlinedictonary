function Synonyms(async, common, config, word) {
    this.async = async;
    this.common = common;
    this.config = config;
    this.word = word;
}

Synonyms.prototype.getRequestData = function (callback) {
    var params = {
        "word": this.word,
        "useCanonical": false
    };
    var url = "/word.json/" + this.word + "/relatedWords";
    this.common.requestGetData(this.config, params, url, function (err, response) {
        if (err) {
            callback(err, null);
        }
        else {
            if (response.statusCode === 200) {
                callback(null, response.body);
            }
            else {
                callback(response.body, null);
            }
        }
    });
};
Synonyms.prototype.validateData = function (responseData, callback) {
    var data;
    for (var eachRelation = 0; eachRelation < responseData.length; eachRelation++) {
        if (responseData[eachRelation]["relationshipType"] === "synonym") {
            console.log("I am Here");
            data = responseData[eachRelation]["words"];
        }
    }
    if (!data || data.length === 0) {
        return callback("no Synonyms Found", null);
    }
    return callback(null, data);
};
Synonyms.prototype.accessMethods = function (callback) {
    var main = this;
    this.async.waterfall([function (callback) {
        main.getRequestData(function (err, responseData) {
            if (err) {
                callback(err, null);
            }
            else {
                // console.log(responseData);
                callback(null, responseData);
            }
        });
    }, function (responseData, callback) {
        main.validateData(responseData, function (err, responseData) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, responseData);
            }
        });
    }], function (err, responseData) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, responseData);
        }
    });
};
exports.synonyms=Synonyms;