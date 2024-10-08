const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require("dotenv").config();
const app = express()
app.use(express.json());
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
app.use('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.listen(process.env.PORT, () => {
    console.log('Server is running on port: ' + process.env.PORT);
});

