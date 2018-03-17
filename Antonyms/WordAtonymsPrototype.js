function Antonyms(async, common, config, word) {
    this.async = async;
    this.common = common;
    this.config = config;
    this.word = word;
}

Antonyms.prototype.getRequestData = function (callback) {
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
Antonyms.prototype.validateData = function (responseData, callback) {
    var data;
    for (var eachDoument = 0; eachDoument < responseData.length; eachDoument++) {
        if (responseData[eachDoument]["relationshipType"] === "antonym") {
            data = responseData[eachDoument]["words"];
        }
    }
    if (!data || data.length === 0) {
        return callback("No antonyms found", null);
    }
    return callback(null, data);
};
Antonyms.prototype.accessMethods = function (callback) {
    var main = this;
    this.async.waterfall([function (callback) {
        main.getRequestData(function (err, responseAntonyms) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, responseAntonyms);
            }
        });
    }, function (responseAntonyms, callback) {
        main.validateData(responseAntonyms, function (err, responseData) {
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
exports.antonyms = Antonyms;