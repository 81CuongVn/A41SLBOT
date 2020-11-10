const Axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();
const { memesChannel } = require("../../../config.json");

module.exports = (client) => {
    let memes = [];
    let memeIndex = 0;
    let memeChannel = "";

    var refreshMemes = () => {
        memes = [];
        memeIndex = 0;
        Axios.get("https://www.reddit.com/r/dankmemes/top/.json?t=day?limit=25")
            .then((response) => {
                let results = response.data.data;
                let children = results.children;
                children.forEach((element) => {
                    memes.push(element.data.url);
                });
                sendMeme();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    var sendMeme = () => {
        memeChannel.send(memes[memeIndex]);
        memeIndex += 1;
        if (memeIndex >= memes.length) {
            refreshMemes();
        }
    };

    client.on("ready", () => {
        console.log("AutoMemer online.");
        memeChannel = client.channels.cache.get(memesChannel);
        refreshMemes();
        setInterval(sendMeme, 7200000);
    });
};
