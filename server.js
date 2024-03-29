import dotenv from 'dotenv';
import connectDB from './src/config/connectDB.js';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

import http from 'http';
import route from './src/routes/index.js';
// import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import realtimeUpdate from './adafruit-server/gate-way.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server is running on PORT: ' + PORT);
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

realtimeUpdate(io);
// listenEvents(io);

io.listen(process.env.SOCKET_PORT);

route(app);
