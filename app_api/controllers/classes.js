var mongoose = require('mongoose');
var Class = mongoose.model('Class');
var Prof = mongoose.model('Professor');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var errNotFound = {"message": "Not found"};

var success = function(res, data) {
    sendJSONresponse(res, 200, data);
}

var errorGet = function(res, err) {
    sendJSONresponse(res, 404, err); // 404 is standard code for GET error
};

module.exports.classesGetAll = function(req, res) {
    Class
        .find()
        .exec(function(err, classes){
            // error handling first
            if (!classes) {
                errorGet(res, errNotFound);
                return;
            } else if (err) {
                errorGet(res, err);
                return;
            }
            
            
            // otherwise, success
            success(res, classes);
        });
};

module.exports.professorsForClass = function(req, res) {
    if (req.params && req.params.classid) {
        Class
            .findById(req.params.classid)
            .exec(function(err, dbclass){
                if (!dbclass || !dbclass.professors) {
                    errorGet(res, errNotFound);
                    return;
                } else if (err) {
                    errorGet(res, err);
                    return;
                }
                
                success(res, dbclass.professors);
            });
    } else {
        errorGet(res, {"message": "No classid in request"});
    }
};