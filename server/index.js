const express = require("express");
const app = express(); // creating server
const PORT = 3000; //

const bodyParser = require("body-parser");
const db = require("../data") 

/* STATICS PAGES */
const pathAllList = path.resolve(__dirname + "/../data/lists.json"); //lists.json
const pathAbout = path.resolve(__dirname + "/../data/about.json"); //about.json



app.use(express.static(__dirname + "/../dist"));
app.use(bodyParser.json()); // for parsing application/json


app.get("/about", function(req, res) { // ABOUT component 
    console.log("On the server side ABOUT");
    res.sendFile(pathAbout);
  });


app.get("/lists", function(req, res) { // ALL LISTS
    console.log("On the server side all LISTS");
    res.sendFile(pathAllList); //respond to the client side 
  });


/* Add List */
app.post("/addlist", function(req, res) {
    console.log(req.body)
    const result = db.addList(req.body);
    res.json(result);
  });
  
  /* edit List */
  app.post("/edit-list/:id", function(req, res) {
    const result = data.editList(req.params, req.body);
    res.json(result);
  });
  
  
  /****** List Id Get all items******/
  app.get("/lists/:id", function(req, res) {
    const temp = data.getList(req.params);
    res.send(temp);
  });
  

  
  



app.listen(PORT, function() {
  console.log("server is listen on port " + PORT);
});