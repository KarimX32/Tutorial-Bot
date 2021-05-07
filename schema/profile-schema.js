const mongo = require('mongoose')

const reqS = {
    type: String,
    required: true,
}

const profileSchema = mongo.Schema({
    guildId: reqS,

    userId: reqS,

    coins: {
        type: Number,
        default: 0,
    },

    warns: {
        type: Number,
        default: 0,
    },
})

module.exports = mongo.model('profiles', profileSchema)