// dependencies
let path = require('path');
// routing
module.exports = function(app){
    app.get('/survey', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    // defaults to home if no route is hit
    app.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};