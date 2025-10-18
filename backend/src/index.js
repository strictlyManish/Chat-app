import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv';
import { conectDB } from './lib/db.js';
import cookie_parser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';
import path from 'path';

import { app, server } from './lib/soket.js';


dotenv.config();
const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json());
app.use(cookie_parser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))




app.use('/api/auth', authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist ')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
} 

server.listen(PORT, () => {
    console.log('server runnig on port ' + PORT);
    conectDB();
})