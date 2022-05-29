//import modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const tmi = require('tmi.js');
const secrets = require('./secretStuff');

//create environment variables
const PORT = process.env.PORT || 8000;

//create the tmi client
const client = new tmi.Client({
	options: { debug: false },
	identity: {
		username: 'CPRPBot',
		password: secrets.password
	},
	channels: secrets.channels,
    connection: {
        port: PORT
    }
});

http.createServer((req, res) => {
    
    if (req.url === '/'){
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    }

}).listen(PORT, () => console.log(`Server running on port:${PORT}`));

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!hello') {
		
		client.say(channel, `@${tags.username}, heya!`);
	}
});

