const {Schema, Type, Types} = require("mongoose");

const reactionsSchema = new Schema (
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 300,
        },
        username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => timestamp.toDateString(),
          },
    },
    {
        toJSON: {
            getters: true,
        },
        timestamps: true,
        id: false

    }
)

module.exports = reactionsSchema