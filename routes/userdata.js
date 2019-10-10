const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const URL = process.env.DB_API;
const jwt = require("jsonwebtoken");
const withAuth = require("../middleware/auth");

//Register
router.post("/signup", (req, res) => {
  const email = req.body.users.email;
  const password = req.body.users.password;

  if (!email || !password) {
    res.status(400).json({ msg: "Please fill the fields" });
  } else {
    MongoClient.connect(
      URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, db) => {
        if (err) throw err;
        dbo = db.db("viame");
        dbo.collection("user").findOne(
          {
            email: email
          },
          (err, result) => {
            if (err) throw err;
            if (result) {
              res.send("User Already Exist");
              db.close();
            } else {
              MongoClient.connect(
                URL,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, db) => {
                  if (err) throw err;
                  dbo = db.db("viame");
                  dbo.collection("user").insertOne(
                    {
                      email: email,
                      password: password
                    },
                    (err, result) => {
                      if (err) throw err;
                      console.log("Inserted Succedfully");
                      res.sendStatus(201);
                      db.close();
                    }
                  );
                }
              );
            }
          }
        );
      }
    );
  }
});

//Login
router.post("/login", (req, res) => {
  const email = req.body.users.email;
  const password = req.body.users.password;

  //MongoDb
  MongoClient.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;
      dbo = db.db("viame");
      dbo.collection("user").findOne({ email: email }, (err, user) => {
        if (err) throw err;
        // Checking user exist
        if (!user.email) return res.status(404).send("Invalid Username");
        //Check password
        if (user.password !== password)
          return res.status(404).send("Invalid Password");
        //Creating Token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
        res.header("x-access-token", token).send({ token, user });
      });
    }
  );
});

//Checking If Token Exist
router.get("/checktoken", withAuth, (req, res) => {
  res.status(200).send("Token Accepted");
});

//Adding Task
router.post("/task", withAuth, (req, res) => {
  //Todo List
  const todolist = {
    title: req.body.todolist.title,
    desc: req.body.todolist.desc,
    state: 1
  };
  //Fectching the User Id from Middleware
  const userId = req.user._id;
  //Inserting data
  MongoClient.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;
      dbo = db.db("viame");
      dbo.collection("task").insertOne({ userId, todolist }, (err, result) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    }
  );
});

//Display Task
router.get("/task", withAuth, (req, res) => {
  const userId = req.user._id;
  MongoClient.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;
      dbo = db.db("viame");
      dbo
        .collection("task")
        .find({ userId: userId })
        .toArray((err, data) => {
          if (err) throw err;
          res.send(data);
          db.close();
        });
    }
  );
});

//Delete Data
router.delete("/task/delete/:id", withAuth, (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  const taskId = req.params.id;
  const task_id = new ObjectId(taskId);
  MongoClient.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;
      dbo = db.db("viame");
      dbo.collection("task").deleteOne({ _id: task_id }),
        (err, data) => {
          if (err) throw err;
          res.sendStatus(200);
        };
    }
  );
});

//Update Data
router.put("/task/update/:id/:status", withAuth, (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  const taskId = req.params.id;
  const status = parseInt(req.params.status);
  const task_id = new ObjectId(taskId);
  MongoClient.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => {
      if (err) throw err;
      dbo = db.db("viame");
      const myQuery = { _id: task_id };
      const newValues = {
        $set: {
          "todolist.state": status
        }
      };
      dbo.collection("task").updateOne(myQuery, newValues),
        (err, data) => {
          if (err) throw err;
          res.sendStatus(200);
        };
    }
  );
});

module.exports = router;
