const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    story: { type: String, require: true },
    image: {type: String, required: false, unique: false, trim: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true }
})


module.exports = mongoose.model('comment', commentSchema)