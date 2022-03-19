import 'reflect-metadata';
import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config'
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';

const app = express();

const server = createServer(app);


app.use(express.static(path.join(__dirname, '..', 'public')));

mongoose.connect(`mongodb://${process.env.DOCKER_DB_SERVER_IPV4}:27017/teste`, {
    authSource: "admin",
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
}).then(() => {
    console.log('MongoDB connected...')
}).catch((e) => { console.log('error:', e) });

const io = new Server(server);

io.on("connection", (socket) => {
    console.log('socket', socket.id);
});

app.get('/', (request: Request, response: Response) => {
    return response.json({
        message: 'Welcome'
    });
});

export { server, io }
