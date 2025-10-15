import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv';
import { conectDB } from './lib/db.js';
import cookie_parser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT


app.use(express.json());
app.use(cookie_parser());

app.use('/api/auth', authRoutes)




app.listen(PORT, () => {
    console.log('server runnig on port ' + PORT);
    conectDB();
})