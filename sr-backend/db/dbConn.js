const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    async sampleQuery(sample_param) {
        return this.query(`SELECT * FROM Sample WHERE param = ?`, [sample_param]);
    }

}