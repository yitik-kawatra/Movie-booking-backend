const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;
const cookieParser = require('cookie-parser');

require('dotenv').config();
require('./db')


app.use(bodyParser.json());
const allowedOrigins = ["https://movie-booking-show.vercel.app/","https://movie-booking-admin.vercel.app/"]; // Add more origins as needed
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ message: 'The API is working' });
});

const mongoose = require('mongoose')
require('dotenv').config();


mongoose.connect(process.env.MONGO_URL,{
    dbName: process.env.DB_NAME
}).then(
    () => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
).catch((err) => {
    console.log('Error connecting to database ' + err);
})
