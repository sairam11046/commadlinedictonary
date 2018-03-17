function Examples(async, common, config, word) {
    this.async = async;
    this.common = common;
    this.config = config;
    this.word = word;
}

Examples.prototype.getRequestData = function (callback) {
    var params = {
        "word": this.word,
        "includeDuplicates": false,
        "useCanonical": false,
        "skip": 0,
        "limit": 5
    };
    var url = "/word.json/" + this.word + "/examples";
    this.common.requestGetData(this.config, params, url, function (err, responseData) {
        if (err) {
            callback(err, null);
        }
        else {
            if (responseData.statusCode === 200) {
                callback(null, responseData.body);
            }
            else {
                callback(responseData.body, null);
            }
        }
    });
};
Examples.prototype.validateData = function (responseData, callback) {
    if (typeof (responseData["examples"]) === "undefined" || responseData["examples"].length === 0) {
        console.log(responseData["examples"]);
        return callback("No Examples Found", null);
    }
    var examples = [];
    for (var eachExamples = 0; eachExamples < responseData["examples"].length; eachExamples++) {
        examples.push(responseData["examples"][eachExamples]["text"]);
    }
    return callback(null, examples);
};
Examples.prototype.accessMethods = function (callback) {
    var main = this;
    this.async.waterfall([function (callback) {
        main.getRequestData(function (err, responseExamples) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, responseExamples);
            }
        });
    }, function (responseExamplesofWord, callback) {
        main.validateData(responseExamplesofWord, function (err, Examples) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, Examples);
            }
        });
    }], function (err, responseExamples) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, responseExamples)
        }
    })
};
exports.examples = Examples;
