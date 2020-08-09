const Discord = require('discord.js')
const client = new Discord.Client()
const prefix = 'gb!'
const fetch = require('node-fetch')
const noPermsBad = new Discord.MessageEmbed()
 .setColor('03fcd3')
 .setTitle('No Perms')
 .setDescription('You don\'t have perms! You are no longer gamer!')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('games', { type:'PLAYING' })
})
client.on('message', function(message) {
    if(message.content == 'gb!ping') {
        if(message.author.bot) return;
        if(message.channel.type == "dm") return;
        const botPing = new Date() - message.createdAt;
        message.channel.send('Pong!\nBot Latency: ' + botPing)
    }
})

client.login(process.env.token)