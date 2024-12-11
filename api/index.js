const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

//console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process if connection fails
    });

// const connectToMongo = async () => {
//     console.log("here");
//     try {
//         console.log("Connecting to mongo");
//         mongoose.set('strictQuery', false);
//         mongoose.connect(process.env.MONGO_URL); 
//         console.log('Mongo connected');
//     }
//     catch(error) {
//         console.log(error);
//         process.exit();
//     }
// }
// module.exports = connectToMongo;

const jwtSecret = process.env.JWT_SECRET;

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req,res) => {
    const {username, password} = req.body;
    try {
        const createdUser = await User.create({username, password});
        jwt.sign({userId: createdUser._id}, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json('ok');
        
        }); 
    }
    catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    } 
});

app.listen(4040);