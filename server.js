const express = require('express');
const app = express();
const axios = require('axios');
const {
    Client,
    RichEmbed
} = require('discord.js');
let client = new Client();
let token = "NzIzMjA5NTA1OTc4MTg3Nzc3.XvZrFA.B3tVC8Xk5tBXpHe81YTvOVA-SzY" //Your token here (Discord bot)
let scriptID = "AKfycby0g8V65B2YcfTfJqwEMhogiXaSz5IHkPXPd6dHMw5H-oxjOtTh" + "/exec" //Your scriptID for your google sheets
let BOTID = 723209505978187777 // Prevents bot from talking to itself, make sure to put your bots ID there.
async function startApp() {
    client.login(token)
    console.log("Successfully logged Discord bot in");
}
startApp();
client.on("ready", () => {
    console.log("Ready");
})

let prefix = '*';

function isCommand(command, message) {
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
client.on('message', (message) => {
    if (message.author.id != BOTID) { 
     if (message.member.roles.some(role => role.name === 'Blacklist Perms')) {
        const args = message.content.slice(prefix.length).split(' ');
        if (isCommand("robloxban", message)) {
            console.log("Banning player UserId " + args[1]);
            message.channel.send("Banning player Username " + args[1]);
            axios.post("https://script.google.com/macros/s/" + scriptID + "?sheet=Global&key=" + args[1] + "&value=" + true, {});
          //Unban the user
        } else if (isCommand("unrobloxban", message)) {
            console.log("Unbanning player Username " + args[1]);
            message.channel.send("Unbanning Username " + args[1]);
            axios.post("https://script.google.com/macros/s/" + scriptID + "?sheet=Global&key=" + args[1] + "&value=" + false, {});
        }
      }
    }
});

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// listen for requests & Keep bot alive
const http = require('http');
let listener = app.listen(process.env.PORT, function() {
    setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
    console.log('Your app is listening on port ' + listener.address().port);
});

client.on('error', console.error)
