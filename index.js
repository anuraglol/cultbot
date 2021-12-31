const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

require("dotenv").config();
// lib to run js code
const { exec } = require("child_process");


const PREFIX = "?";

const client = new Discord.Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ],
});

client.on("ready", () => {
  console.log("Tada, I'm ready");
});

client.on("messageCreate", async (message) => {
  if (message.content === `${PREFIX}ping`) {
    message.reply("pong!");
  }
});

// send rules as embed
client.on("messageCreate", async (message) => {
  if (message.content === `${PREFIX}rules`) {

    message.delete();
    const embed = new MessageEmbed()
      .setTitle("Rules")
      .setDescription(
        "1. No spamming\n2. No spamming\n3. No spamming\n4."
      )
      .setColor("#0099ff");
    message.channel.send({ embeds: [embed] });
  }
});

// run javascript code send result as embed using v13
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(`${PREFIX}js`)) {
    const args = message.content.slice(3).split(" ");
    const code = args.join(" ");
    try {
      const evaled = eval(code);
      const embed = new MessageEmbed()
        .setTitle("JavaScript")
        .setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
        .setColor("#0099ff");
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      const embed = new MessageEmbed()
        .setTitle("JavaScript")
        .setDescription(`\`\`\`js\n${err}\n\`\`\``)
        .setColor("#0099ff");
      message.channel.send({ embeds: [embed] });
    }
  }
});

// run js code using exec and send result as embed
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(`${PREFIX}js2`)) {
    const args = message.content.slice(4).split(" ");
    const code = args.join(" ");
    exec(code, (err, stdout, stderr) => {
      const embed = new MessageEmbed()
        .setTitle("JavaScript")
        .setDescription(`\`\`\`js\n${stdout}\n\`\`\``)
        .setColor("#0099ff");
      message.channel.send({ embeds: [embed] });
    });
  }
});

// client.on("messageCreate", async (msg) => {
//   msg.channel.send("thik hai bhai, mai chalta hu ab")
// })


client.login(process.env[`TOKEN`]);