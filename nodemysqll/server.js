const express = require('express')
var bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express()
server.use(bodyParser.json());
const cors = require("cors");

server.use(cors());


//Database Connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_management_system",
});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
});

//Establish the Port

server.listen(8585,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }
    else 
    {
        console.log("Started....!!!! 8585");
    }
});

//Create the Records

server.post("/api/student/add", (req, res) => {
    let details = {
      fname: req.body.fname,
      lname: req.body.lname,
      bdate: req.body.bdate,
      gender: req.body.gender,
      email: req.body.email,
      mnumber: req.body.mnumber,
      address: req.body.address,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "User created Failed" });
      } else {
        res.send({ status: true, message: "User created successfully" });
      }
    });
});

//view the Records

server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});

//Search the Records

server.get("/api/student/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id=" + studentid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});

//Update the Records

server.put("/api/student/update/:id", (req, res) => {
    let sql =
      "UPDATE student SET fname='" +
      req.body.fname +
      "', lname='" +
      req.body.lname +
      "', bdate='" +
      req.body.bdate +
      "', gender='" +
      req.body.gender +
      "', email='" +
      req.body.email +
      "', mnumber='" +
      req.body.mnumber +
      "', address='" +
      req.body.address +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Student Updated Failed" });
      } else {
        res.send({ status: true, message: "Student Updated successfully" });
      }
    });
});

//Delete the Records

server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
});