var mongoose = require('mongoose');
var Class = mongoose.model('Class');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.classesGetAll = function(req, res) {
    sendJSONresponse(res, 200, {"status": "success"});
};

module.exports.professorsForClass = function(req, res) {
    sendJSONresponse(res, 200, {"status": "success"});
};