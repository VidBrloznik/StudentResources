const express = require('express');
const router = express.Router();
const db = require('../db/dbConn');
const { body, validationResult, param } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.name);
    }
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));


router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../sr-backend/uploads', filename);
    res.download(filepath, (err) => {
        if (err) {
            console.error("Error downloading the file:", err);
            res.status(500).send("Error downloading the file.");
        }
    });
});


router.post('/uploads', upload.single('file'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: { success: false, msg: "No file uploaded" } });
        }

        const { mimetype, size } = req.file;
        const filePath = path.join('uploads', req.file.filename);
        const name = req.body.naslov || req.file.originalname;


        const queryResult = await db.addDatoteka(name, mimetype, size, filePath);

        res.status(200).json({
            datotekaId: queryResult.insertId,
            status: { success: true, msg: "File uploaded successfully" }
        });
    } catch (err) {
        console.error("Error in /uploads:", err);
        res.status(500).json({ status: { success: false, msg: "Error uploading file" } });
        next(err);
    }
});

router.get('/session', (req, res, next) => {
    try {
        if (req.session.logged_in) {
            res.status(200).json(req.session.user);
        } else {
            res.status(401).json({ stranka: null, status: { success: false, msg: "Uporabnik ni prijavljen" } });
        }
    } catch (error) {
        res.status(500).json({ status: { success: false, msg: "Napaka pri pridobivanju seje" } });
    }
});

router.get('/datoteke/:datotekaId', async (req, res, next) => {
    const { datotekaId } = req.params;
    try {
        const queryResult = await db.getFileName(datotekaId);
        res.status(200).json({ data: queryResult, status: { success: true } });
    } catch (err) {
        console.error("Error in /predmeti:", err);
        res.status(500).json({ status: { success: false, msg: "Napaka pri pridobivanju predmetov" } });
        next(err);
    }
});

router.get('/predmeti', async (req, res, next) => {
    try {
        const queryResult = await db.getPredmeti();
        res.status(200).json({ data: queryResult, status: { success: true } });
    } catch (err) {
        console.error("Error in /predmeti:", err);
        res.status(500).json({ status: { success: false, msg: "Napaka pri pridobivanju predmetov" } });
        next(err);
    }
});

router.post('/predmeti', [
    body('Naziv').isString().isLength({ max: 50 }),
    body('Opis').isString(),
    body('ProfesorID').isInt()
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { Naziv, Opis, ProfesorID } = req.body;
        const queryResult = await db.addPredmet(Naziv, Opis, ProfesorID);
        res.status(200).json({ predmet: queryResult, status: { success: true, msg: "Predmet dodan" } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: { success: false, msg: "Napaka pri dodajanju predmeta" } });
        next();
    }
});

router.get('/uporabniki/:IDavtor', async (req, res) => {
    const { IDavtor } = req.params;

    try {
        const queryResult = await db.getAvtorName(IDavtor);
        res.status(200).json({ data: queryResult, status: { success: true } });
    } catch (err) {
        console.error("Error in /uporabniki:", err);
        res.status(500).json({ status: { success: false, msg: "Napaka pri pridobivanju imena" } });
    }
});

router.get('/predmeti/:predmetId', async (req, res) => {
    const { predmetId } = req.params;

    try {
        const queryResult = await db.getPredmetPodatki(predmetId);
        res.status(200).json({ data: queryResult, status: { success: true } });
    } catch (err) {
        console.error("Error in /predmeti:", err);
        res.status(500).json({ status: { success: false, msg: "Napaka pri pridobivanju podatkov predmetov" } });
        next(err);
    }
});

router.get('/komentarji/uporabnik/:uporabnikID', async (req, res, next) => {
    const { uporabnikID } = req.params;

    try {
        const queryResult = await db.getUserKomentarji(uporabnikID);
        res.status(200).json({ data: queryResult, status: { success: true } });
    } catch (err) {
        console.error("Error in /komentarji/uporabnik:", err);
        res.status(500).json({ status: { success: false, msg: "Error fetching comments." } });
        next(err);
    }
});


router.get('/gradiva/uporabnik/:uporabnikID', async (req, res, next) => {
    const { uporabnikID } = req.params;

    try {
        const queryResult = await db.getUserGradiva(uporabnikID);
        res.status(200).json({ data: queryResult, status: { success: true } });
    } catch (err) {
        console.error("Error in /gradiva/uporabnik:", err);
        res.status(500).json({ status: { success: false, msg: "Error fetching gradiva." } });
        next(err);
    }
});

router.get('/uporabnik/:avID', async (req, res, next) => {
    const { avID } = req.params;
    try {
        const queryResult = await db.getAvtor(avID);

        if (queryResult && queryResult.length > 0) {
            const [user] = queryResult;
            res.status(200).json({ data: user, status: { success: true } });
        } else {
            res.status(404).json({ status: { success: false, msg: "User not found." } });
        }
    } catch (err) {
        console.error("Error in /uporabnik:", err);
        res.status(500).json({ status: { success: false, msg: "Error fetching user name." } });
        next(err);
    }
});



router.get('/predmeti/:predmetId/gradiva', async (req, res) => {
    const { predmetId } = req.params;
    try {
        const queryResult = await db.getGradiva(predmetId);
        res.status(200).json({ data: queryResult, status: { success: true } });
    } catch (err) {
        console.error("Error in /predmeti:", err);
        res.status(500).json({ status: { success: false, msg: "Napaka pri pridobivanju podatkov predmetov" } });
        next(err);
    }
});



router.get('/uploads/download/:datotekaId', async (req, res) => {
    const { datotekaId } = req.params;
    try {
        const datoteka = await db.getDatoteka(datotekaId);
        if (!datoteka) {
            return res.status(404).json({ status: { success: false, msg: "Datoteka not found" } });
        }
        const filePath = path.join(__dirname, '../sr-backend/uploads', path.basename(datoteka.PotDoDatoteke));
        res.download(filePath, datoteka.ImeDatoteke);
    } catch (error) {
        console.error("Error downloading file:", error);
        res.status(500).json({ status: { success: false, msg: "Error downloading file" } });
    }
});


router.get('/gradiva/:gradivoId', async (req, res) => {
    const { gradivoId } = req.params;
    try {
        const gradivo = await db.getGradivo(gradivoId);
        if (!gradivo) {
            return res.status(404).json({ status: { success: false, msg: "Gradivo not found" } });
        }
        res.status(200).json({ data: gradivo, status: { success: true } });
    } catch (error) {
        console.error("Error fetching Gradivo:", error);
        res.status(500).json({ status: { success: false, msg: "Error fetching Gradivo" } });
    }
});

router.post('/gradiva', [
    body('naslov').isString().isLength({ max: 255 }),
    body('opis').isString(),
    body('tip').isString(),
    body('datotekaId').isInt(),
    body('predmetId').isInt(),
    body('avtorId').isInt()
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { naslov, opis, tip, datotekaId, predmetId, avtorId } = req.body;
        await db.addGradivo(naslov, opis, tip, datotekaId, predmetId, avtorId);
        res.status(200).json({ status: { success: true, msg: "Gradivo successfully added!" } });
    } catch (err) {
        console.error("Error in /gradiva:", err);
        res.status(500).json({ status: { success: false, msg: "Error adding Gradivo." } });
        next(err);
    }
});


router.post('/gradiva/:gradivoId/komentarji/:uporabnikID', [
    body('vsebina').isString().isLength({ min: 1 })
], async (req, res) => {
    const { uporabnikID, gradivoId } = req.params;
    const { vsebina } = req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await db.addKomentar(vsebina, uporabnikID, gradivoId);
        res.status(201).json({ status: { success: true, msg: "Comment added successfully" } });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ status: { success: false, msg: "Error adding comment" } });
    }
});


router.post('/gradiva/:gradivoId/ocene/:uporabnikID', [
    body('ocena').isInt({ min: 1, max: 5 }),
    body('komentar').optional().isString()
], async (req, res) => {
    const { uporabnikID, gradivoId } = req.params;
    const { ocena, komentar } = req.body;
    console.log();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await db.addOcena(ocena, komentar, uporabnikID, gradivoId);
        res.status(201).json({ status: { success: true, msg: "Rating added successfully" } });
    } catch (error) {
        console.error("Error adding rating:", error);
        res.status(500).json({ status: { success: false, msg: "Error adding rating" } });
    }
});



router.get('/komentarji/:gradivoId', async (req, res) => {
    const { gradivoId } = req.params;
    try {
        const komentarji = await db.getKomentarji(gradivoId);
        res.json({ status: { success: true }, data: komentarji });
    } catch (error) {
        console.error('Error fetching komentarji:', error);
        res.status(500).json({ status: { success: false, msg: 'Error fetching komentarji.' } });
    }
});


router.get('/ocene/:gradivoId', async (req, res) => {
    const { gradivoId } = req.params;
    try {
        const ocene = await db.getOcene(gradivoId);
        res.json({ status: { success: true }, data: ocene });
    } catch (error) {
        console.error('Error fetching ocene:', error);
        res.status(500).json({ status: { success: false, msg: 'Error fetching ocene.' } });
    }
});
module.exports = router;
