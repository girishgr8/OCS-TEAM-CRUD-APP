const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require('axios');
require('dotenv').config({ path: __dirname + '/.env' })

const app = express();

// axios.get(`https://gorest.co.in/public/v2/users`)
//     .then(resp => {
//         for (let i = 0; i < resp.data.length; i++) {
//             const { id, name, email, gender, status } = resp.data[i];
//             const sqlInsert = `INSERT INTO users(id, name, email, gender, status) values(${id}, '${name}', '${email}', '${gender}', '${status}')`;
//             db.query(sqlInsert, (qryerr, qryres) => {
//                 if (qryerr && qryerr.errno != 1062) console.log(qryerr);
//                 else console.log(qryres);
//             });
//         }
//     }).catch(err => console.log("Error to fetch data\n"));

const db = mysql.createConnection({
    host: process.env['DATABASE_HOST'],
    user: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PSWD'],
    database: process.env['DATABASE_NAME'],
    port: process.env['DATABASE_PORT']
});

db.connect((err) => {
    if (!err) {
        console.log("Connected to MYSQL database");
        // db.query("CREATE DATABASE crudapp", function (dberr, dbres) {
        //     if (err) console.log(dberr);
        //     console.log("Database created");
        // });
        const sqlCreateTable = `CREATE TABLE users (
                                id INT NOT NULL, 
                                name VARCHAR(255), 
                                email VARCHAR(255), 
                                gender VARCHAR(6), 
                                status VARCHAR(8),
                                PRIMARY KEY (id))`;
        db.query(sqlCreateTable, (qryerr, qryres) => {
            if (qryerr && qryerr.errno != 1050) console.log(qryerr);
            else if (qryres) console.log(qryres);
        });
    } else {
        console.log(err);
        console.log("Could not connect to MYSQL database");
    }
});


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello from 'Office of Career Services(OCS)' Team");
});

app.get("/api/getAllUsers", (req, res) => {
    const sqlSelect = "SELECT * FROM users";
    db.query(sqlSelect, (err, qryres) => {
        if (err) console.log("err", err);
        else console.log(qryres);
        res.send(qryres);
    });
});

app.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const sqlSelect = `SELECT * FROM users WHERE id = ${id}`;
    db.query(sqlSelect, (qryerr, qryres) => {
        if (qryerr) console.log("err", err);
        else console.log(qryres);
        res.send(qryres);
    });
});

app.post("/api/addUser", (req, res) => {
    const { name, email, gender, status } = req.body;
    const sqlGetMaxId = `SELECT MAX(id) AS maxid FROM users`;
    let maxid = null;
    db.query(sqlGetMaxId, (qryerr, qryres) => {
        if (qryerr) console.log(qryerr);
        else console.log(qryres);
        maxid = qryres[0].maxid;
    });
    const sqlInsert = `INSERT INTO users(id, name, email, gender, status) 
        values(1, ${name}, ${email}, ${gender}, ${status})`;
    db.query(sqlInsert, (qryerr, qryres) => {
        if (qryerr) console.log(qryerr);
        else console.log(qryres);
    });
    return res.send("status : Success");
});

app.post("/api/deleteUser/:id", (req, res) => {
    const { id } = req.params;
    const sqlSelect = `DELETE FROM users WHERE id = ${id}`;
    db.query(sqlSelect, (qryerr, qryres) => {
        if (qryerr) console.log(qryerr);
        else console.log(qryres);
        res.send(qryres);
    });
});

app.put("/api/updateUser/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, gender, status } = req.body;
    const sqlUpdate = `UPDATE users 
                        SET name = ${name}, 
                        email = ${email}, 
                        gender = ${gender},
                        status = ${status}
                        WHERE id =  ${id}`;
    db.query(sqlUpdate, (err, qryres) => {
        if (err) console.log(err);
        else console.log(qryres);
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));