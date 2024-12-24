const express = require("express");
const mongoose = require("mongoose");
const EventToDoSchema = require("../EventTodoSchema/EventTodoSchema");
const router = express.Router();


const eventToDoModel = mongoose.model("EventTodo", EventToDoSchema);

// getting all the boards
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const query = { boardId: id };
    try {
        const result = await eventToDoModel.find(query);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});

// Posting todo
router.post("/", async (req, res) => {
    const todo = req.body;
    try {
        const result = await eventToDoModel.create(todo);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
});

// updating todo status
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedTodo = await eventToDoModel.findByIdAndUpdate(
            { _id: id }, // Use id instead of ids
            { $set: { status } },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "updated successfully", updatedTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;