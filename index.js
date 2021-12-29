const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

require("dotenv").config()

const client = new Discord.Client({
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: true,

  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ]
})

client.on('ready', () => {
  console.log("Tada, I'm ready")
})

client.on('message', async message => {
  if (message.content === '$ping') {
    message.reply('pong!')
  }
})

client.login(process.env[`TOKEN`])
