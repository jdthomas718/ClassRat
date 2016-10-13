// BASIC HTTP SERVER EXAMPLE (don't use!)
/*var http = require("http"); // load http module

http.createServer(function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "https://preview.c9users.io"); // allow remote server access
    response.writeHead(200, {"Content-Type": "text/plain"}); // write success (200) status to HTTP header
    response.end("Hello, World!");
}).listen(process.env.PORT, process.env.IP); // begin listening on Cloud9's port and IP
*/

// CORE HTTP/RESTful SERVER EXAMPLE (do use!)
var express = require("express"); // require express module
var app = express(); // start express
var mongoose = require('mongoose'); // require mongoose (for mongodb integration
var fs = require('fs'); // necessary to read from files

fs.readFile(".dbconfig", 'utf8', function(err,data){
   if (err) {
        console.log(err);
   } else {
        var dbAccess = JSON.parse(data); // if read successful, parse JSON into object
        var userAuthString = dbAccess.user + ':' + dbAccess.password; // get username and password
        mongoose.connect('mongodb://' + userAuthString + '@ds147975.mlab.com:47975/classratdbtest'); // connect to database
   }
});

app.use(express.static("public")); // serve files within the "public" folder

app.get("/hello", function(request, response) { // provide RESTful GET API at /hello
    response.send("Hello, World!"); // respond with string
});

app.get("/coolbeans", function(request, response) { // provide RESTful GET API at /hello
    response.send("This is cool beans"); // respond with string
});

app.listen(process.env.PORT, process.env.IP); // begin app listening on Cloud9 port/IP

console.log("Server running!");