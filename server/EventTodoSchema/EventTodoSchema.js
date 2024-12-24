const mongoose = require('mongoose');

const EventToDoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    boardId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },

});

module.exports = EventToDoSchema