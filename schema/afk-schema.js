const mongoose = require("mongoose")

const AFKSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    guildId: {
        type: String,
        required: true
    },
    AFK: {
        type: Boolean,
        default: false,
    },
    AFK_Reason: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("afk", AFKSchema)