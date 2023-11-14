const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
});
const UserRev = mongoose.model('UserRev', userReviewSchema);

module.exports = UserRev;