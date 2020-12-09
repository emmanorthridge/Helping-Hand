const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    username: {
        type: String,
    },
    text: {
        type: String,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            username: {
                type: String,
            },
            text: {
                type: String,
                required: true,
            },
           
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('Post', PostSchema)