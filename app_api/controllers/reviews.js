var mongoose = require('mongoose');
var Class = mongoose.model('Class');

var sendJSONresponse = function(res, status, content) {
  res.set('Access-Control-Allow-Origin','*');
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

var errorPost = function(res, err) {
    sendJSONresponse(res, 400, err); // 400 is standard code for POST error
};

module.exports.reviewsGetAll = function(req, res) {
    res.set('Access-Control-Allow-Origin','*');
    if (req.params && req.params.classid && req.params.professorid) {
        Class
            .findById(req.params.classid) // return, excluding reviews array
            .select('professors._id professors.reviews._id professors.reviews.username professors.reviews.rating professors.reviews.text')
            .exec(function(err, dbclass){
                if (!dbclass || !dbclass.professors || dbclass.professors.length == 0) {
                    errorGet(res, errNotFound);
                    return;
                } else if (err) {
                    errorGet(res, err);
                    return;
                }
                
                // requires extra error checking in case specified professor doesn't exist
                var professor = dbclass.professors.id(req.params.professorid);
                if (!professor) {
                    errorGet(res, errNotFound);
                    return;
                }
                

                for(var i = 0; i < professor.reviews.length; i++) {
                    // add created date to reviews
                    professor.reviews[i]._doc.created = professor.reviews[i]._doc._id.getTimestamp();
                }

                success(res, professor.reviews);
            });
    } else {
        if (!req.params)
            errorGet(res, {"message": "No classid or professorid in request"});
        else if (!req.params.classid)
            errorGet(res, {"message": "No classid in request"});
        else
            errorGet(res, {"message": "No professorid in request"});
    }
};

module.exports.reviewsCreate = function(req, res) {
    res.set('Access-Control-Allow-Origin','*');
    if (req.params && req.body && req.params.classid && req.params.professorid) {
        Class
            .findById(req.params.classid) // return, excluding reviews array
            .select('professors._id professors.reviews')
            .exec(function(err, dbclass){
                if (!dbclass || !dbclass.professors || dbclass.professors.length == 0) {
                    errorPost(res, errNotFound);
                    return;
                } else if (err) {
                    errorPost(res, err);
                    return;
                }
                
                // requires extra error checking in case specified professor doesn't exist
                var professor = dbclass.professors.id(req.params.professorid);
                if (!professor) {
                    errorPost(res, errNotFound);
                    return;
                }
                
                var newReview = {
                    _id: mongoose.Types.ObjectId(),
                    username: req.body.username,
                    rating: req.body.rating,
                    text: req.body.text
                };
                professor.reviews.push(newReview);

                dbclass.save(function(err, location){
                    if (err) {
                        errorPost(res, err);
                    } else {
                        success(res, newReview);
                    }
                });
            });
    } else {
        if (!req.params)
            errorPost(res, {"message": "No classid or professorid in request"});
        else if (!req.params.classid)
            errorPost(res, {"message": "No classid in request"});
        else if (!req.params.professorid)
            errorPost(res, {"message": "No professorid in request"});
        else
            errorPost(res, {"message": "No request body"});
    }
};