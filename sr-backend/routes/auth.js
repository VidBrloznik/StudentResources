const express = require('express');
const router = express.Router();
const DB = require('../db/dbConn');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


router.post('/registracija',
    async (req, res, next) => {
        try {
            const { ime, priimek, mail, geslo, vloga, fakulteta } = req.body;
            const queryResult = await DB.registracijaStranka(ime, priimek, mail, geslo, vloga, fakulteta);
            res.status(200).json({ user: queryResult, status: { success: true, msg: "Račun ustvarjen" } });
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
            next()
        }
    });

module.exports = router;

