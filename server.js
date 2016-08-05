//author:sharad Biradar
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var config = require('config'); 
var fs = require('fs');
var errorHandler = require('errorhandler');
var favicon = require('serve-favicon');

(function main() {
    //Default port
    var serverPort = 8443; //default
    if (config.server && config.server.port) {
        serverPort = config.server.port;
    }

    var port = process.env.PORT || serverPort; // set our port
    
    //Override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override')); 

    //Set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/public')); 
   // app.use(favicon(__dirname + '/public/favicon.ico')); //uncomment when favicon is available.

    app.use(bodyParser.json());
    
    //TODO: Add Logger Configuration.
    //Creates the directory for upload.
    if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
    }
    
    //Working route.
    //Serve index html file.
    app.get('*', function(req, res) {
        console.log('index.html');
        res.sendfile('./public/index.html');
    });
   
    //Start the Application now
    app.listen(port, function(){
        console.log('Server has been started on port:' + port); 
    });

    // error handling middleware should be loaded after the loading the routes
    if ('localdev' === app.get('env')) {
       app.use(errorHandler());
    }
    //Expose app    
    exports = module.exports = app;             
})();