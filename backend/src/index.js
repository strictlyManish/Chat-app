import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv';
import { conectDB } from './lib/db.js';
import cookie_parser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from 'cors';



dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use(express.json());
app.use(cookie_parser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);





app.listen(PORT, () => {
    console.log('server runnig on port ' + PORT);
    conectDB();
})