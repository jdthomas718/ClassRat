var mongoose = require ('mongoose');

var reviewSchema = new mongoose.Schema({
    created: {type: Date, "default": Date.now},
    username: {type: String, "default": "anonymous"},
    rating: {type: Number, required: true, min: 1, max: 5},
    text: {type: String}
});

var professorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    reviews: [reviewSchema]
});

var classSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    professors: [professorSchema]
});

mongoose.model('Class', classSchema);