const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()
const prefix = config.prefix
const stalkedRecently = new Set()
const richedRecently = new Set()
const fetch = require('node-fetch')
const noPermsBad = new Discord.MessageEmbed()
 .setColor('03fcd3')
 .setTitle('No Perms')
 .setDescription('You don\'t have perms! You are no longer gamer!')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    function statusThing() {
    const statuses = ['games', 'with the Bank', 'with mysmelf', 'Terraria']
    const theStatus = Math.floor(Math.random()*statuses.length)
    client.user.setActivity(statuses[theStatus], { type:"PLAYING" })
    }
    setInterval(statusThing, 20000)
})
client.on('message', async(message) => {
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    if(message.channel.type == "dm") {
        message.channel.send('You cannot use GamerBot in dms!')
    } else {

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        const gabPing = new Date() - message.createdAt
        await message.reply(`Pong! My latency is ${gabPing}! That's super gamer!`)
    }

    if(command === "help") {
        const gabboHelp = new Discord.MessageEmbed()
         .setColor('03fcd3')
         .setTitle('GamerBot Help Menu')
         .setDescription('Gamer! Here are my commands')
         .setThumbnail('https://cdn.discordapp.com/attachments/715386760317894757/745326698412769521/gabrielz4.png')
         .addField('**gb!ping**', 'Check the bot\'s latency in ms', true)
         .addField('**gb!dog**', 'Image of a dog!', true)
         .addField('**gb!mc**', 'Minecraft skin for a user!', true)
         .addField('**gb!howrichisgabriel**', 'How rich is he?', true)
         .addField('**gb!stalkgabriel**', 'Find gabriel!', true)
         .addField('**gb!gg**', 'GG!', true)
         .setFooter('Gamer')
         .setTimestamp()
        await message.channel.send({embed:gabboHelp})
    }

    if(command === "dog") {
        const dogURL = await fetch('https://api.thedogapi.com/v1/images/search').then(x => x.json())
        const dogImage = dogURL[0]
        const DogEmbed = new Discord.MessageEmbed()
         .setColor('03fcd3')
         .setTitle(':dog: Woof Woof! Gamer Dog!')
         .setImage(dogImage.url)
         .setFooter('Gamer')
         .setTimestamp()
        await message.channel.send({embed:DogEmbed})
    }

    if(command === "mc") {
        const username = args[0]
        if(!username) {
            await message.reply('Uh oh! You didn\'t provide enough arguments! That isn\'t gamer!')
        } else {
            try {
                const obj = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`).then(x => x.json())
                const uuid = obj.id 
                if(!uuid) {
                    message.reply('This is an invalid name!')
                } else {
                    const thingEmbed = new Discord.MessageEmbed()
                     .setColor('03fcd3')
                     .setTitle('Minecraft Information for User')
                     .setThumbnail(`https://crafatar.com/renders/body/${uuid}?overlay`) 
                     .addField('**Skin:**', `[Download Skin](https://crafatar.com/skins/${uuid})`)
                     .addField('**UUID**:', `${uuid}`)
                     .setFooter('Names Provided by Mojang API, Avatar Provided by Crafatar API')
                     .setTimestamp()
                    message.channel.send({embed:thingEmbed})
                }
                } catch (err) {
                    message.reply('This is an invalid name!')
                }
        }
    }

    if(command === "howrichisgabriel") {
        if(richedRecently.has(message.author.id)) {
            message.reply(':ice_cube: Chill out man! You\'re on cooldown for 20 seconds!');
    } else {
        try {
            const obj = await fetch('https://api.hypixel.net/skyblock/profiles?uuid=796aebd45af94fb5a1447b0ff95bc2af&key=41a82fa1-b52f-41d5-8eb3-87d03e2a3ec7').then(x => x.json())
            const otherObj = await fetch('https://sky.lea.moe/api/v2/profile/gabrielz1').then(x => x.json())
            const purse = otherObj.profiles["c531ad68a12a428e9593a4f65b3b3b83"].data.purse
            const bank = obj["profiles"][3].banking.balance
            const money = bank + purse
            const brokeEmbed = new Discord.MessageEmbed()
             .setColor('03fcd3')
             .setTitle('How Rich is Gabriel?')
             .setThumbnail('https://static.planetminecraft.com/files/resource_media/screenshot/12545965-pack.png')
             .setDescription(`Gabriel owns ${money} coins! Depth doesn't own any`)
             .setFooter('Gamer')
             .setTimestamp()
            message.channel.send({embed:brokeEmbed})
        } catch (err) {
            message.reply('Something went wrong! Please try again later.')
        }
    }
    richedRecently.add(message.author.id);
            setTimeout(() => {
              richedRecently.delete(message.author.id);
            }, 20000);
    }

    if(command === "stalkgabriel") {
        if(stalkedRecently.has(message.author.id)) {
            message.reply(':ice_cube: Chill out! You\'re on coolodown for 30 seconds! Let him move, man!')
        } else {
        try {
        const otherObj = await fetch('https://sky.lea.moe/api/v2/profile/gabrielz1').then(x => x.json())
        const location = otherObj.profiles["c531ad68a12a428e9593a4f65b3b3b83"].data.current_area
        const updated = otherObj.profiles["c531ad68a12a428e9593a4f65b3b3b83"].data.last_updated.text
        const stalkEmbed = new Discord.MessageEmbed()
         .setColor('03fcd3')
         .setTitle('Gabriel Found!')
         .setThumbnail('https://crafatar.com/renders/body/796aebd45af94fb5a1447b0ff95bc2af?overlay')
         .setDescription(`The last place Gabriel was found was in the ${location}, ${updated}!`)
         .setFooter('Gamer')
         .setTimestamp()
        message.channel.send('Stalking gabriel...').then((message) => {
        setTimeout(() => {
            message.edit({embed:stalkEmbed})
        }, 3000)
    }) 
} catch (err) {
    message.channel.send('Stalking gabriel...').then((message) => {
        setTimeout(() => {
            message.edit(`Oh no! Something went wrong! Please try again later!`)
        }, 5000)
    }) 
}
    }
    stalkedRecently.add(message.author.id);
            setTimeout(() => {
              stalkedRecently.delete(message.author.id);
            }, 30000);
}

    if(command === "gg") {
        const times = args[0]
        if(!times) {
            message.reply("GG! You didn't supply an amount that you wanted me to say GG! Grammer!")
        } else if(times > 20) {
            message.reply("that's toooooo many times")
        } else if(times < 1) {
            message.reply("thats toooo little times")
        } else {
            let roles = []
            for(let spam = 0; spam < times; spam++) {
                roles.push('GG\n')
            }
            message.channel.send(roles)
    }
}

    if(command === "shutdown") {
        if(message.author.id != "315173627232518147") {
            message.channel.send({embed:noPermsBad})
        } else {
            message.channel.send('f in the chat for fallen gamer')
            setTimeout(() => {
                client.destroy()
            }, 2000)
        }
    }
}
})

client.login(config.token)