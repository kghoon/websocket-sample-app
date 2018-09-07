const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const path = require('path');


const PORT = process.env.PORT || 8080;
const app = express();

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

    console.log('Connection established. # of clients:', wss.clients.size);

    ws.on('close', () => {
        console.log('Disconnected. # of clients:', wss.clients.size);
    });

    ws.on('message', (data) => {
        ws.send(data);
    });
});


app.get('/', (req, res) => {
    res.status(200).end('Hello World\n');
});

app.use('/client', express.static(path.join(__dirname, 'client')));

server.on('request', app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

