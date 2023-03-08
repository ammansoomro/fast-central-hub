const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
        unique: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

module.exports = mongoose.model("Announcement", AnnouncementSchema);
