// require('express') to install express app
var express = require("express");

// call express in variable
var app = express();
// using EJS (Embedded JavaScript). EJS is a templating language
app.set("view engine", "ejs");

// body-parser is middleware
// body-parser allows to make use of the key-value pairs stored on the req-body object
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// the task array with initial placeholders for added task
var task = ["buy socks", "practise with nodejs"];

// the completed task array with initial placeholders for removed task
var complete = ["finish jquery"];

//post route for adding new task
app.post("/addtask", function (req, res) {
    var newTask = req.body.newtask;

    //add the new task from the post route into the array
    task.push(newTask);
    //after adding to the array go back to the root route
    res.redirect("/");
});

app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;

    // check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);

        // check if the completed task already exist in the task when checked,
        // then remove using the array splice method
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            completeTask.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

// takes us to the root (/) URL + callback function
// render the ejs and display added task, task(index.ejs) = task(array)
app.get("/", function(req, res){
    // to send the equivalent HTML to the client
    res.render("index", { task: task, complete: complete });
});

// the server is listening on port 3000
app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});