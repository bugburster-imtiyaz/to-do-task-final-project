const mongoose = require('mongoose');

const EventTaskSchema = new mongoose.Schema({
    boardName: {
        type: String,
        required: true
    },
    boardBgImg: {
        type: String,
    },
    plannerName: {
        type: String,
        required: true,
    },
    plannerEmail: {
        type: String,
        required: true,
    },

});



module.exports = EventTaskSchema