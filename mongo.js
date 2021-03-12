const mongo = require('mongoose')
const { mongoPath } = require('./config.json')

module.exports = async () => {
    await mongo.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    return mongo
}

mongo.connection.on('connected', () => {
    console.log('sucessfully connected to mongo')
})