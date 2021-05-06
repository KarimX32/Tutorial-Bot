const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    blacklisted: {
        type: Boolean,
        default: false
    }

})


module.exports = mongoose.model('user-info', UserSchema)