const { MessageButton, MessageActionRow } = require("discord-buttons")
const ms = require("ms")

const paginator = async (msg, pages) => {
    if(!msg && !msg.channel) throw new Error("Provide a message to access the channel")
    if(!pages) throw new Error("Please provide pages")
    let page = 0
    const btn1 = new MessageButton().setEmoji('⬅️').setID("00001101001110").setStyle("green")
    const btn2 = new MessageButton().setEmoji('➡️').setID("00101101001110").setStyle("green")
    const row = new MessageActionRow().addComponents([btn1, btn2])
    const btn1After = new MessageButton().setEmoji('⬅️').setID("00101101101110").setStyle("green").setDisabled()
    const btn2After = new MessageButton().setEmoji('➡️').setID("00101101011110").setStyle("green").setDisabled()
    const deadRow = new MessageActionRow().addComponents([btn1After, btn2After])

    const curPage = await msg.channel.send({embed: pages[0], component: row})
    const filter = (b) => ['00001101001110', '00101101001110'].includes(b.id)
    const col = await curPage.createButtonCollector(filter, { time: ms('10s') })

    col.on('collect', button => {
        button.reply.defer()
        if(button.clicker.user.id !== msg.author.id) return

        if(button.id == '00001101001110') {
            page = page > 0 ? --page : pages.length - 1
        }

        else if(button.id == '00101101001110') {
            page = page + 1 < pages.length ? ++page : 0;
        }

        curPage.edit({embed: pages[page], component: row})
    })

    col.on('end', () => {
        if(!curPage.deleted) {
            curPage.edit({embed: pages[page], component: deadRow})
        }
    })

    return curPage
}

module.exports = paginator