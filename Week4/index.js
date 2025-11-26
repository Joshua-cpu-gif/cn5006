var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");



var app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

// serve form
app.get('/studentinfo', function(req, res) {
    res.sendFile(__dirname + "/StudentInfo.html");
});

// Post method
app.post('/submit-data', function(req, res) {
    var name = req.body.firstName + " " + req.body.lastName;
    var Age = req.body.myAge;
    var Gender = req.body.gender;
    var Qual = req.body.Qual;

    res.send({
        status: true,
        message: 'form Details',
        data: {
            name: name,
            age: Age,
            gender: Gender,
            qualification: Qual
        }
    });
});

// get all students
app.get('/GetStudents', function(req, res) {
    fs.readFile(__dirname + "/Student.json", 'utf8', function(err, data) {
        if (err) throw err;

        res.json({
            status: true,
            Status_Code: 200,
            studentdata: JSON.parse(data)
        });
    });
});

// get student by ID
app.get('/GetStudentid/:id', function(req, res) {
    fs.readFile(__dirname + "/Student.json", 'utf8', function(err, data) {
        if (err) throw err;

        var students = JSON.parse(data);
        var student = students["Student" + req.params.id];

        if (student) {
            res.json(student);
        } else {
            res.json({
                status: false,
                message: "Student not found",
                id_requested: req.params.id
            });
        }
    });
});

// start server
app.listen(5000, function() {
    console.log("server is running on port 5000");
});
