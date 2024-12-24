const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();


const EventTaskHandler = require("./EventaTaskHandler/EventTaskHandler");
const eventTodoHandler = require("./EventTodoHandler/EventTodoHandler");

// middleware
app.use(cors());
app.use(bodyParser.json());

// console.log(object);
// const dbURI = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}
// @proppioneers.pzy67in.mongodb.net/Event-Planet`;
// console.log(object);
const dbURI = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.rarr4yf.mongodb.net/ahom?retryWrites=true&w=majority&appName=Cluster0`;
// Mongodb connection

mongoose
    .connect(dbURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// routes
app.get("/", (req, res) => {
    res.send("Your are in ToDoTask server site");
});


app.use("/eventTask", EventTaskHandler);
app.use("/eventTodo", eventTodoHandler);

// _________________________________________________
// incorrect url error
app.use((req, res, next) => {
    res.status(404).send("Requested url was not found");
});


app.listen(port, () => {
    console.log(` Event Planet Server is running on port: ${port}`);
});