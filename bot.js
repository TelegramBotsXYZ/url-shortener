require('dotenv').config()
const { Telegraf, session, Scenes } = require('telegraf')
const bitly = require('./shorteners/bitly')

const bot = new Telegraf(process.env.BOT_TOKEN)

const welcomeMessage = 'Welcome to the URL Shortener bot !' +
    '\nWith this bot, you can shorten your URLs using bit.ly' +
    '\n\n*Bot Instructions :*' +
    '\n\n/short Create a short URL'

bot.start((ctx) => ctx.replyWithMarkdown(welcomeMessage))

bot.command('short', ctx => {
    ctx.reply('Please enter your long URL :')
    bot.hears(new RegExp(/.*/i), async replyCtx => {
        const result = await bitly.shorten(replyCtx.message.text)
        if(result.success) {
            replyCtx.reply('Here is your shortened URL :')
            replyCtx.reply(result.link)
        } else {
            replyCtx.reply(result.error)
        }
    })
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))