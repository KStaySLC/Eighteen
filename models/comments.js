const { Schema, model } = require("mongoose");
const reactions = require('./reactions');


const commentsSchema = new Schema (
    {
        commentsText: {
            type: String,
            required: true,
            maxLength: 300
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => timestamp.toDateString(),
        },
        username: {
            type: String,
            required: true
          },
          reactions: [reaction],
    },
        {
          toJSON: {
            getters: true,
            virtuals: true,
          },
          timestamps: true,
          id: false,
        },
    
)

const Comments = model("comments", commentsSchema);

module.exports = Comments