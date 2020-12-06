const { canModifyQueue } = require("../../util/EvobotUtil");
const { MessageEmbed } = require("discord.js");
const musicChannel = process.env.MUSIC_CHANNEL;

module.exports = {
    name: "remove",
    description: "Remove song from the queue",
    execute(message, args) {
        if (message.channel.id != musicChannel) {
            return message.author.send(
                "⛔ Music commands are only available in **add-music** channel"
            );
        }

        const queue = message.client.queue.get(message.guild.id);
        const emptyQueue = new MessageEmbed()
            .setColor(0xda7272)
            .setTitle("Empty Queue")
            .setDescription("There is nothing in the queue");

        if (!queue)
            return message.channel.send(emptyQueue).catch(console.error);
        if (!canModifyQueue(message.member)) return;

        const noArgs = new MessageEmbed()
            .setColor(0xd3d3d3)
            .setTitle("Usage")
            .setDescription(`${message.client.prefix}remove <Queue Number>`);

        const NaNer = new MessageEmbed()
            .setColor(0xd3d3d3)
            .setTitle("Usage")
            .setDescription(`${message.client.prefix}remove <Queue Number>`);

        if (!args.length) return message.reply(noArgs);
        if (isNaN(args[0])) return message.reply(NaNer);

        const song = queue.songs.splice(args[0] - 1, 1);

        const remov = new MessageEmbed()
            .setColor(0x7289da)
            .setTitle("Song Removed from Queue")
            .setDescription(
                `${message.author} removed **${song[0].title}** from the queue`
            );

        queue.textChannel.send(remov);
    },
};
