const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const EventTaskSchema = require("../EventShema/EventSchema");

const eventTaskModel = mongoose.model("EventTask", EventTaskSchema);


// getting all the boards
router.get("/", async (req, res) => {
    try {
        const { email } = req.query;
        let query = {};
        if (email) {
            query.plannerEmail = email;
        }
        const result = await eventTaskModel.find(query);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
})


// getting single board
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let query = { _id: id };
        const result = await eventTaskModel.findOne(query);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
})


// Posting board data 
router.post("/", async (req, res) => {
    const board = req.body;
    console.log(board);
    try {
        const result = await eventTaskModel.create(board);
        res.status(201).json({ message: "Board posted successfully", result });
    } catch (error) {
        console.error("Error posting board:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports = router;