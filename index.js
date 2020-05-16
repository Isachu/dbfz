Discord = require('discord.js');
global.client = new Discord.Client({
	messageCacheMaxSize: 1,
	disabledEvents: [
		'TYPING_START',
		'GUILD_MEMBER_UPDATE',
		'MESSAGE_REACTION_ADD',
		'GUILD_MEMBER_ADD',
		'GUILD_MEMBER_REMOVE'
	],
	disableEveryone: true
});

const { token } = require('./token.json');

const chars = {
    base: ['Tien', 'Yamcha', 'Gohan (Adult)', 'Krillin', 'Frieza', 'Android 18', 'Goku (Super Saiyan)', 'Kid Buu', 'Captain Ginyu', 'Nappa', 'Goku (SSGSS)', 'Trunks', 'Vegeta (Super Saiyan)', 'Beerus', 'Cell', 'Android 16', 'Vegeta (SSGSS)', 'Gotenks', 'Piccolo', 'Gohan (Teen)', 'Android 21', 'Majin Buu', 'Hit', 'Goku Black'],
    1: ['Goku', 'Zamasu (Fused)', 'Vegito (SSGSS)', 'Vegeta', 'Broly', 'Bardock', 'Cooler', 'Android 17'],
    2: ['Jiren', 'Videl', 'Goku (GT)', 'Janemba', 'Gogeta (SSGSS)', 'Broly (DBS)'],
    3: ['Kefla']
};

const moves = ['5l', '5ll', '5lll', '5m', '5h', '5s', '2l', '2m', '2h', '2s', '6m', 'j.l', 'j.m', 'j.h', 'j.s', 'j.2h'];

const help = `@ me to get a random team for DBFZ Season 3!

Tell me which seasons you have DLC for to filter the characters. No arguments assumes no DLC.

Examples:
\`@DBFZ Random 3\` will include the Season 2 DLC.
\`@DBFZ Random 1 3\` will include the Season 1 and 3 DLC.
\`@DBFZ Random 1 2 3\` will include all the DLC.`;

const parseArgs = (arr) => {
    if (!arr.length) return chars.base;

    arr = arr.filter(x => !isNaN(parseInt(x)));
    return arr.reduce((acc, cur) => acc.concat(chars[cur]), chars.base);
}

const randomAssist = () => {
    let x = Math.floor(Math.random() * 3);

    if (x === 0) return 'A';
    else if (x === 1) return 'B';
    else return 'C';
}

const randomChars = (arr) => {
    let char1 = arr.splice(Math.floor(Math.random() * arr.length), 1) + ' ' + randomAssist();
    let char2 = arr.splice(Math.floor(Math.random() * arr.length), 1) + ' ' + randomAssist();
    let char3 = arr.splice(Math.floor(Math.random() * arr.length), 1) + ' ' + randomAssist();

    return '\nPoint: ' + char1 + '\nMid: ' + char2 + '\nAnchor: ' + char3 + '\n';
}

client.on('message', msg => {
    if (!msg.mentions.users.find(u => u.id === client.user.id)) return;
    
    const args = msg.content.split(/ +/);
    args.shift();

    if (args[0] === 'help') return msg.channel.send(help).then(console.log(msg.author.tag + ' got help')).catch(e => console.error(e));

    msg.channel.send(randomChars(parseArgs(args))).then(console.log(msg.author.tag + ' got some characters')).catch(e => console.error(e));
});

client.once('ready', () => {
    client.user.setActivity('@ me for a random DBFZ team! | @DBFZ Random help')
    console.log('Ready!');
});

client.login(token);