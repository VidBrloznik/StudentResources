const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require("dotenv").config();
const db = require('./db/dbConn');
const app = express();

db.connect()

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}));

app.use(cors(
    {
        origin: ['*', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE'],
        credentials: true,
        exposedHeaders: ['set-cookie']
    }
))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

// Register route
app.post('/api/register', async (req, res) => {
    const { ime, priimek, email, geslo, vloga, fakulteta } = req.body;
    try {
        await db.registerUser(ime, priimek, email, geslo, vloga, fakulteta);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Registration failed' });
    }
});

app.use('/auth', require('./routes/auth')); // Ensure this is correct
app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(process.env.PORT, () => {
    console.log('Server is running on port: ' + process.env.PORT);
});

app.use(express.static(path.join(__dirname, 'build')));

// app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(process.env.PORT, () => {
    console.log('Server is running on port: ' + process.env.PORT);
});

