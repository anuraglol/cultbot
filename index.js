const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

require("dotenv").config();

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

client.on("message", async (message) => {
  if (message.content === `${PREFIX}ping`) {
    message.reply("pong!");
  }
});


// client.on("message", async (message) => {
//   if (message.content === `${PREFIX}kick`) {
//     const member = message.mentions.members.first();
//     if (!member) {
//       return message.reply("Please mention a valid member of this server");
//     }
//     if (!member.kickable) {
//       return message.reply(
//         "I cannot kick this user! Do they have a higher role? Do I have kick permissions?"
//       );
//     }
//     await member.kick();

//     const embed = new MessageEmbed()
//       .setTitle("Kicked")
//       .setDescription(`${member.user.tag} has been kicked`)
//       .setColor("#ff0000")
//       .setTimestamp();

//     message.channel.send(embed);
//   }
// });

client.login(process.env[`TOKEN`]);
