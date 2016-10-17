module.exports = function(mongoose, url, user, password) {
    var connectionString = 'mongodb://' + ((user && password) ? user + ':' + password + '@' + url : url);
    
    // begin connection
    mongoose.connect(connectionString); // connect to database
    
    mongoose.connection.on('connected', function() {
      console.log('Mongoose connected to ' + url);
    });
    mongoose.connection.on('error', function(err) {
      console.log('Mongoose connection error ' + err);
    });
    mongoose.connection.on('disconnected', function() {
     console.log('Mongoose disconnected'); 
    });
      

    // set up database shutdown
    var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function() {
            console.log('Mongoose disconnected through ' + msg);
            callback();
        });  
    };
    
    // nodemon restarts
    process.on('SIGUSR2', function() {
      gracefulShutdown('nodemon restart', function() {
          process.kill(process.pid, 'SIGUSR2');
      });
    });
    
    // app termination
    process.on('SIGINT', function() {
      gracefulShutdown('app termination', function() {
          process.exit(0);
      });
    });
    
    // Heroku app termination
    process.on('SIGTERM', function() {
      gracefulShutdown('Cloud9 app shutdown', function() {
          process.exit(0);
      });
    });
}