const mongoose = require("mongoose");
const proSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true, // Ensures _id is always provided
    },
    date: {
        type: Date,
        required: true, // Ensures date is provided
    },
    amount: {
        type: Number,
        required: true,
        min: [100, 'Amount must be at least 100'], // Ensures amount is at least 100
        max: [10000, 'Amount must not exceed 10000'], // Ensures amount does not exceed 10000
    },
    status: {
        type: String,
        required: true, // Ensures status is provided
        trim: true, // Ensures any extra spaces around status are trimmed
    }
}, {
    timestamps: true
});

const proModel = mongoose.model("Data", proSchema);

module.exports = proModel;