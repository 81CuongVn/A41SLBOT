const { canModifyQueue } = require("../../util/Util");
const { MessageEmbed } = require("discord.js");
const {
  musicChannelOne,
  musicChannelTwo,
  musicChannelErrorResponse,
  primaryColor,
  errorColor,
} = require("../../../config.json");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  execute(message) {
    if (
      message.channel.id != musicChannelOne &&
      message.channel.id != musicChannelTwo
    ) {
      return message.author.send(musicChannelErrorResponse);
    }
    const queue = message.client.queue.get(message.guild.id);
    const nothingPlaying = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Error!")
      .setDescription(`There is nothing playing`);

    if (!queue) return message.reply(nothingPlaying).catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      const resumed = new MessageEmbed()
        .setColor(primaryColor)
        .setTitle("Resumed")
        .setDescription(`${message.author} ▶ resumed the music`);

      return queue.textChannel.send(resumed).catch(console.error);
    }

    return message.reply("The queue is not paused.").catch(console.error);
    const notPaused = new MessageEmbed()
      .setColor(errorColor)
      .setTitle("Error!")
      .setDescription(`The song/queue is not paused`);

    return message.reply(notPaused).catch(console.error);
  },
};
