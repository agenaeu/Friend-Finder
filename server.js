let express = require("express");
let path = require("path");
let app = express();
let PORT = process.env.PORT || 7210;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routing
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);



    
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  