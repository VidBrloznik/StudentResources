const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require("express")
const NOW = new Date();
class Database {
    constructor() {
        this.conn = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || null,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });
    }

    connect() {
        this.conn.connect((error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Database connection established!');
            }
        });
    }

    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, params, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    async authUser(email, geslo) {
        const user = await this.query('SELECT * FROM Uporabnik WHERE Email = ?', [email]);
        if (user.length === 0) {
            return null;
        }
        const isValidPassword = await bcrypt.compare(geslo, user[0].Geslo);
        if (isValidPassword) {
            return user[0];
        } else {
            return null;
        }
    }

    async registerUser(ime, priimek, email, geslo, vloga, fakulteta) {
        const hashedPassword = await bcrypt.hash(geslo, saltRounds);
        return this.query(
            `INSERT INTO Uporabnik (Ime, Priimek, Email, Geslo, Vloga, Fakulteta) VALUES (?,?,?,?,?,?)`,
            [ime, priimek, email, hashedPassword, vloga, fakulteta]
        );
    }
    async addDatoteka(name, mimetype, size, filePath) {
        return this.query(
            `INSERT INTO Datoteka (ImeDatoteke, PotDoDatoteke, Velikost, Tip, DatumNalozenja) VALUES (?, ?, ?, ?, NOW())`,
            [name, filePath, size, mimetype]
        );
    }

    async addOcena(ocena, komentar, avtorId, gradivoId) {
        return this.query(
            `INSERT INTO Ocena (Ocena, Komentar, AvtorID, GradivoID) VALUES (?, ?, ?, ?)`,
            [ocena, komentar, avtorId, gradivoId]
        );
    }

    async addKomentar(vsebina, avtorId, gradivoId) {
        return this.query(
            `INSERT INTO Komentar (Vsebina, CasObjave, AvtorID, GradivoID) VALUES (?, NOW(), ?, ?)`,
            [vsebina, avtorId, gradivoId]
        );
    }

    async getOcene(gradivoId) {
        const query = `SELECT * FROM Ocena WHERE GradivoID = ? ORDER BY OcenaID DESC`;
        const rows = await this.query(query, [gradivoId]);
        return rows;
    }

    async getKomentarji(gradivoId) {
        const query = `SELECT * FROM Komentar WHERE GradivoID = ? ORDER BY CasObjave DESC`;
        const rows = await this.query(query, [gradivoId]);
        return rows;
    }

    async deleteUser(email) {
        return this.query(`DELETE FROM Uporabnik WHERE Email = ?`, email);
    }

    async getPredmeti() {
        const query = `SELECT * FROM Predmet`;
        const rows = await this.query(query);
        return rows;
    }


    async addPredmet(Naziv, Opis, ProfesorID) {
        return this.query(
            `INSERT INTO Predmet (Naziv, Opis, ProfesorID) VALUES (?, ?, ?)`,
            [Naziv, Opis, ProfesorID]
        );
    }
    async getAvtor(avID) {
        return this.query('SELECT Ime, Priimek FROM Uporabnik WHERE UporabnikID = ?', [avID]);
    }
    async getUserGradiva(uporabnikID) {
        return this.query('SELECT * FROM Gradivo WHERE AvtorID = ?', [uporabnikID]);
    }

    async getUserKomentarji(uporabnikID) {
        return this.query('SELECT * FROM Komentar WHERE AvtorID = ?', [uporabnikID]);
    }

    async getPredmetPodatki(predmetId) {
        return this.query('SELECT * FROM Predmet WHERE PredmetID = ?', [predmetId]);
    }

    async getAvthorID(predmetId) {
        return this.query('SELECT ProfesorID FROM Predmet WHERE PredmetID = ?', [predmetId]);
    }

    async getAvtorName(IDavtor) {
        return this.query('SELECT Ime, Priimek FROM Uporabnik WHERE UporabnikID = ?', [IDavtor]);
    }

    async getFileName(datotekaId) {
        return this.query(`SELECT ImeDatoteke FROM Datoteka WHERE DatotekaID = ?`, [datotekaId]);
    }

    async getGradiva(predmetId) {
        return this.query(`SELECT * FROM Gradivo WHERE PredmetID = ?`, [predmetId]);
    }

    async addGradivo(naslov, opis, tip, datotekaId, predmetId, avtorId) {
        return this.query(
            `INSERT INTO Gradivo (Naslov, Opis, DatumNalozenja, Tip, DatotekaID, PredmetID, AvtorID) VALUES (?, ?,NOW(), ?, ?, ?, ?)`,
            [naslov, opis, tip, datotekaId, predmetId, avtorId]
        );
    }

    async deleteGradivo(gradivoId) {
        return this.query(`DELETE FROM Gradivo WHERE GradivoID = ?`, [gradivoId]);
    }

    async getGradivo(gradivoId) {
        const query = `SELECT g.*, u.Ime as AvtorIme, u.Priimek as AvtorPriimek 
                       FROM Gradivo g 
                       JOIN Uporabnik u ON g.AvtorID = u.UporabnikID
                       WHERE g.GradivoID = ?`;
        const rows = await this.query(query, [gradivoId]);
        return rows[0];
    }

    async getDatoteka(datotekaId) {
        return this.query = (`SELECT * FROM Datoteka WHERE DatotekaID = ?`, [datotekaId]);
    }
}
const db = new Database();
db.connect();
module.exports = db;
