const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Display all commands and descriptions",
    execute(message) {
        let commands = message.client.commands.array();

        let helpEmbed = new MessageEmbed()
            .setTitle("All For One Bot Help")
            .setThumbnail("https://i.imgur.com/wSTFkRM.png")
            .setDescription("List of all commands")
            .setColor("#F8AA2A")
            .addFields(
                {
                    name: "/join",
                    value: "Bot will join you'r voice channel"
                },
                {
                    name: "/leave",
                    value: "Bot will leave you'r voice channel "
                },
                {
                    name: "/play",
                    value: "Use this command along with a URL from youTube or soundCloud to play music"
                },

                { name: "\u200B", value: "\u200B" },

                {
                    name: "Stream Live Radio",
                    value: "Use /leave Command to disconnect the bot"
                },
                { name: "\u200B", value: "\u200B" },
                {
                    name: "Yes Fm",
                    value: "/stream yesfm",
                    inline: true
                },
                {
                    name: "Sun Fm",
                    value: "/stream sunfm",
                    inline: true
                },
                {
                    name: "Kiss Fm",
                    value: "/stream kissfm",
                    inline: true
                },
                {
                    name: "Gold Fm",
                    value: "/stream goldfm",
                    inline: true
                },

                {
                    name: "TNL Radio",
                    value: "/stream tnlfm",
                    inline: true
                },
                {
                    name: "Fox Radio",
                    value: "/stream foxfm",
                    inline: true
                }
            )

            .setFooter("All For One Bot is still on alpha stage Please feel free to contribute on Git Hub")
            .setTimestamp();
        return message.channel.send(helpEmbed).catch(console.error);
    }
};
