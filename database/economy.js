const mongo = require('../mongo')
const profileSchema = require('../schema/profile-schema')
const coinsCache = {}
module.exports = (Client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {
    return await mongo().then(async (mongoose) => {
        try {
            const res = await profileSchema.findOneAndUpdate(
                {
                    guildId,
                    userId
                },
                {
                    guildId,
                    userId,
                    $inc: {
                        coins,
                    }
                    
                },

                {
                    upsert: true,
                    new: true
                }

            )
            coinsCache[`${guildId}-${userId}`] = res.coins
            return res.coins
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.Coins = async (guildId, userId) => {
    const cachedV = coinsCache[`${guildId}-${userId}`]
    if(cachedV) {
        return cachedV
    }

    return await mongo().then(async (mongoose) => {
        try{
            const result = await profileSchema.findOne({
                guildId,
                userId,
            })

            let coins = 0
            if(result) {
                coins = result.coins
            } else {
                await new profileSchema({
                    guildId,
                    userId,
                    coins,
                }).save()
            }

            coinsCache[`${guildId}-${userId}`] = coins
            return coins
        } finally {
            mongoose.connection.close()
        }
    })
}