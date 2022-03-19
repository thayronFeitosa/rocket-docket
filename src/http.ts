import 'reflect-metadata';
import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config'
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);


app.use(express.static(path.join(__dirname, '..', 'public')));

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
