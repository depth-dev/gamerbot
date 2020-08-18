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

client.login(process.env.token)