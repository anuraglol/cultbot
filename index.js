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

client.on("messageCreate", async (message) => {
  if (message.content === `${PREFIX}ping`) {
    message.reply("pong!");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === `${PREFIX}kick`) {
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Please mention a valid member of this server");
    }
    if (!member.kickable) {
      return message.reply(
        "I cannot kick this user! Do they have a higher role? Do I have kick permissions?"
      );
    }
    await member.kick();

    const embed = new MessageEmbed()
      .setTitle("Kicked")
      .setDescription(`${member.user.tag} has been kicked`)
      .setColor("#ff0000")
      .setTimestamp();

    message.channel.send(embed);
  }
});

// reaction roles
client.on("messageReactionAdd", async (reaction, user) => {
  const message = reaction.message;
  const member = message.guild.members.cache.get(user.id);
  const role = message.guild.roles.cache.find(
    (r) => r.name === reaction.emoji.name
  );

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log("Something went wrong when fetching the message: ", error);
      return;
    }
  }

  if (message.id === "735754901058181856") {
    if (reaction.emoji.name === "🎉") {
      member.roles.add(role);
    }
  }
});

// run javascript code
client.on("messageCreate", async (message) => {
  if (message.content === `${PREFIX}run`) {
    const code = message.content.split(" ").slice(1).join(" ");
    try {
      const evaled = eval(code);
      const clean = await require("util").inspect(evaled, {
        depth: 0,
      });
      message.channel.send(clean, {
        code: "js",
      });
    } catch (err) {
      message.channel.send(err, {
        code: "js",
      });
    }
  }
});


client.login(process.env[`TOKEN`]);
