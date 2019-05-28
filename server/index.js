const express = require("express");
const app = express(); // creating server
const PORT = 3000; //
const path = require('path');

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

app.get("/list", function(req, res) { // ALL LISTS
    console.log("On the server side all LISTS");
    res.sendFile(pathAllList); //respond to the client side 
  });


  /**
  * Add List
  * HTTP Request post
  * @param {string} '/addlist' The original Url 
  * @param {object} req 
  * @param {object} res 
  *
  */
app.post("/addlist", function(req, res) {
    const result = db.addList(req.body);//req.body an object type {title: "some string", description: "some string"}
    res.json(result); //result an object type {id:"some random string", title: "some string", description: "some string"}
  });
  
  app.post("/edit-list/:id", function(req, res) {
    console.log("Edit List on the server");
    console.log("Edit List on the server",typeof req,req);
    console.log("Edit List on the server",typeof req.body,req.body);
    console.log("Edit List on the server",typeof req.params,req.params);
    const result = db.editList(req.params, req.body);
    console.log("Edit List on the server",typeof result.params,result.params);
    res.json(result);
  });
  
  
  /* Get Add  Edit  Card*/

  app.get("/lists/:id", function(req, res) { // get all the cards from parent list
    const temp = db.getList(req.params);
    res.send(temp);
  });

  app.post("/addItem/:id", function(req, res) {
    const result = db.addCard(req.params, req.body);
    res.json(result);
  });
  

  
  



app.listen(PORT, function() {
  console.log("server is listen on port " + PORT);
});