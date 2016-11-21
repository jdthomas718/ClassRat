var mongoose = require("mongoose");

var professorSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

mongoose.model('Professor', professorSchema);