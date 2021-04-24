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
        required: true,
    },
})

module.exports = mongo.model('profiles', profileSchema)