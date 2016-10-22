var mongoose = require('mongoose');
var Class = mongoose.model('Class');

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
        .find() // return, excluding professors array
        .select('code name')
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
            .findById(req.params.classid) // return, excluding reviews array
            .select('professors._id professors.name professors.reviews.rating')
            .exec(function(err, dbclass){
                if (!dbclass || !dbclass.professors) {
                    errorGet(res, errNotFound);
                    return;
                } else if (err) {
                    errorGet(res, err);
                    return;
                }

                // find average rating (the sloppy way for now)
                for(var i = 0; i < dbclass.professors.length; i++) {
                    var total = 0;
                    for (var j = 0; j < dbclass.professors[i]._doc.reviews.length; j++) {
                        total+= dbclass.professors[i]._doc.reviews[j].rating;
                    }
                    dbclass.professors[i]._doc.average = total / dbclass.professors[i]._doc.reviews.length;
                }
                
                success(res, dbclass.professors);
            });
    } else {
        errorGet(res, {"message": "No classid in request"});
    }
};