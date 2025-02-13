import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoute from './src/routes/productRoute.js';
import userRoute from './src/routes/userRoute.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    productRoute,
    userRoute
);

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Connected to Mongodb');
        app.listen(PORT, () => {
            console.log(`Server is running at: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })