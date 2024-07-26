import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import dotenv  from 'dotenv';
import commonRouter from "./routers/commonRouter.js";
import productsRouter from "./routers/Products.js";
import webSettingRouter from "./routers/WebSetting.js";
import authRouter from "./routers/auth.js";
import paymentRouters from "./routers/paymentRouters.js";

dotenv.config();
const app = express();
const host = 'localhost'
const port = 4024;
const server = http.createServer(app);
const clients = {};

setupWebSocket();
function setupWebSocket() {
    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };
    const wsServer = new WebSocket.Server({server});
    const sendMessage = (jsonData,connection) => {
        // We are sending the current data to all connected clients
        Object.keys(clients).map((client) => {
            if(jsonData.objectId === 'open' && clients[client] !== connection){
                clients[client].send(JSON.stringify(jsonData));
            }
        });
    }
    wsServer.on('connection', function(connection) {
        const userID = getUniqueID();
        clients[userID] = connection;
        connection.on('message', function(message) {
            let dataToSend = JSON.parse(message);
            sendMessage(dataToSend);
        })
    })
}



app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.urlencoded({ extended: true,limit: '250mb' }));

app.use(express.json({limit: '250mb'}));

///////// USER API GET ////////////////
app.use('/api/common', commonRouter);
///////// USER API GET ////////////////
///////// BlogPost GET ////////////////
app.use('/api/products', productsRouter);
app.use('/api/web-setting', webSettingRouter);
app.use('/api/auth', authRouter);
app.use('/api/payment', paymentRouters);
///////// BlogPost api GET ////////////////
app.get('/api', (req, res) => {
    res.status(200).send({message:`Node Server is ready port ${port}`});
});

app.use((err, req, res,next) => {
    res.status(500).send({ message: err.message });
});

server.listen(port,host, function() {
    console.log('[ SOCKET SERVER CONNECTED TO PORT ]',port);
})

