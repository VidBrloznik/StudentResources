const express = require('express');
const router = express.Router();
const DB = require('../db/dbConn');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const cors = require('cors');

router.post('/registracija',
    async (req, res, next) => {
        console.log(req.body);
        try {
            const { ime, priimek, email, geslo, vloga, fakulteta } = req.body;
            const queryResult = await DB.registerUser(ime, priimek, email, geslo, vloga, fakulteta);
            res.status(200).json({ user: queryResult, status: { success: true, msg: "Račun ustvarjen" } });
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
            next()
        }
    });

router.post('/prijava',
    async (req, res, next) => {
        try {
            const { email, geslo } = req.body;
            const user = await DB.authUser(email, geslo);
            if (user) {
                res.status(200).json({ user, status: { success: true, msg: "Prijava uspešna", uporabnik: user } });
            } else {
                res.status(200).json({ status: { success: false, msg: "Prijava neuspešna" } });
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
            next()
        }
    });



module.exports = router;

