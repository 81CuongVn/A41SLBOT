const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { primaryColor } = require("../../../config.json");
const os = require("os");

module.exports = {
  name: "botinfo",
  description: "Bot server status",
  async execute(message, args) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    const guildID = message.guild.name;
    const statsEmbed = new Discord.MessageEmbed()
      .setColor(primaryColor)
      .setThumbnail(message.client.user.avatarURL())
      .setFooter(
        message.client.user.username,
        message.client.user.displayAvatarURL()
      )
      .addField(`System Os`, `${os.platform()}`, false)
      .addField(`Architecture`, `${os.arch()}`, false)
      .addField(`Processor`, `${os.cpus().map((i) => `${i.model}`)[0]}`, false)
      .addField(
        `RAM`,
        `${Math.trunc(
          process.memoryUsage().heapUsed / 1024 / 1000
        )} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round(
          (Math.round(process.memoryUsage().heapUsed / 1024 / 1024) /
            Math.round(os.totalmem() / 1024 / 1024)) *
            100
        )}%)`,
        false
      )
      .addField(
        `Server up Time`,
        "" +
          `${days} days, ${hours} hours,${minutes} minutes, ${seconds} seconds` +
          "",
        false
      )

      .addField(`Library`, `Discord.js ${Discord.version}`, false)
      .addField(
        "Contribute",
        `https://github.com/BlazeIsClone/A41SLBOT`,
        false
      );

    message.reply(statsEmbed).catch(console.error);
  },
};
