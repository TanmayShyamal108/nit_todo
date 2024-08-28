

var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var constr = "mongodb://127.0.0.1:27017";

app.get("/users", (req, res) => {
    mongoClient.connect(constr).then(clientObj => {
        var database = clientObj.db("reactdb");
        database.collection("users").find({}).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })


})

app.get("/appointments/:userid", (req, res) => {

    mongoClient.connect(constr).then(clientObj => {
        var database = clientObj.db("reactdb");
        database.collection("appointments").find({ UserId: req.params.userid }).toArray().then(document => {
            res.send(document);
            res.end();
        })
    })


})

app.post("/register-user", (req, res) => {

    var user = {

        UserId: req.body.UserId,
        UserName: req.body.UserName,
        Password: req.body.Password,
        Mobile: req.body.Mobile,
        Email: req.body.Email
    }
    mongoClient.connect(constr).then(clientObj => {
        var database = clientObj.db("reactdb");
        database.collection("users").insertOne(user).then(() => {
            console.log("New user success fully added");
            res.end();
        })
    })

})

app.get("/get-task/:id", (req, res) => {
    mongoClient.connect(constr).then(clientObject => {
        var database = clientObject.db("sampledb");
        database.collection("appointments").find({Appointment_Id: parseInt(req.params.id) }).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.post("/add-task", (req, res) => {

    var task = {
        Appointment_Id: parseInt(req.body.Appointment_Id),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    }
    mongoClient.connect(constr).then(clientObj => {
        var database = clientObj.db("reactdb");
        database.collection("appointments").insertOne(task).then(() => {
            console.log("New task added");
            res.end();
        })
    })

})

app.put("/edit-task/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(constr).then(clientObj => {
        var database = clientObj.db("reactdb");
        database.collection("appointments").updateOne({ Appointment_Id: id }, { $set: { Appointment_Id: id, Title: req.body.Title, Description: req.body.Description, Date: new Date(req.body.Date), UserId: req.body.UserId } }).then(() => {
            console.log("Your task have succesfully edit")
            res.end();
        })

    })
})

app.delete("/delete-task/:id", (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(constr).then(clientObj => {
        var database = clientObj.db("reactdb");
        database.collection("appointments").deleteOne({ Appointment_Id: id }).then(() => {
            console.log("Task deleted...");
            res.end();
        })
    })
})

app.listen(5050);
console.log("Your application running on http://127.0.0.1:5050");