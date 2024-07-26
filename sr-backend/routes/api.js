const express = require('express');
const router = express.Router();
const db = require('../db/dbConn');
const { body, validationResult, param } = require('express-validator');


router.get('/session', (req, res, next) => {
    try {
        if (req.session.logged_in) {
            res.status(200).json(req.session.user)
        } else {
            res.status(401).json({ stranka: null, status: { success: false, msg: "Uporabnik ni prijavljen" } })
        }
    } catch (error) {
        res.status(500).json({ status: { success: false, msg: "Napaka pri pridobivanju seje" } })
        next(error);
    }
});

router.get('/predmeti', async (req, res, next) => {
    try {
        const queryResult = await DB.getPredmeti()
        res.statusCode = 200;
        res.json(queryResult)
        res.end();
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
        next()
    }
});

module.exports = router;
