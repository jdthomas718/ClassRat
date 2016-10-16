module.exports = function(app) {
  var mongoose = require('mongoose'); // require mongoose (for mongodb integration
  var fs = require('fs'); // necessary to read from files

  fs.readFile(".dbconfig", 'utf8', function(err,data){
     if (err) {
          console.log(err);
     } else {
          var dbAccess = JSON.parse(data); // if read successful, parse JSON into object
          var userAuthString = dbAccess.user + ':' + dbAccess.password + '@' + dbAccess.url; // get username and password
          mongoose.connect('mongodb://' + userAuthString); // connect to database
     }
  });

  app.get("/api/hello", function(request, response) { // provide RESTful GET API at /hello
      response.send("Hello, World!"); // respond with string
  });

  app.listen(process.env.PORT, process.env.IP); // begin app listening on Cloud9 port/IP

  console.log("API running!");
}