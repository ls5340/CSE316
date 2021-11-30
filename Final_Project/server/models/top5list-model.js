const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        itemTuples: { type: [Object], required: true} ,
        ownerEmail: { type: String, required: true },
        published: { type: Date, required: false },
        communityList: { type: Boolean, required: true },
        likes: { type: Number, required: true },
        likedBy: { type: [String], required: true },
        dislikes: { type: Number, required: true },
        dislikedBy: { type: [String], required: true },
        views:  {type: Number, required: true },
        comments: { type: [String], required: true },
        commentsBy: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
