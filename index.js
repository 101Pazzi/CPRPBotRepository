//import modules
const http = require('http');
const fs = require('fs');
const path = require('path');

//create environment variables
const PORT = process.env.PORT || 8000;

http.createServer((req, res) => {
    
    if (req.url === '/'){
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
    }

}).listen(PORT, () => console.log(`Server running on port:${PORT}`));

