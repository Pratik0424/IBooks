import express from 'express'
import mysql  from 'mysql2';
import bodyParser from 'body-parser'; //middleware for parsing JSON
import cors from 'cors';  // resource sharing
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(bodyParser.json()); //Parses incoming request bodies in JSON format.

// Serve static files from the "public" directory
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'cdac',
    database: 'eBooks'
});

db.connect(err => {
    if (err) {
      console.log(err);
      return;
      
    }
    console.log('MySQL connected...');
});

// Create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE ebook_manager';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Database created...');
    });
});

// Create table
app.get('/createpurchasetable', (req, res) => {
    let sql = 'CREATE TABLE purchases(id int AUTO_INCREMENT, bookname VARCHAR(255), buyername VARCHAR(255), bookcost DECIMAL(10, 2), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Purchases table created...');
    });
});

app.post('/addpurchase', (req, res) => {
    let purchase = { bookname: req.body.bookname, buyername: req.body.buyername, bookcost: req.body.bookcost };
    let sql = 'INSERT INTO purchases SET ?';
    db.query(sql, purchase, (err, result) => {
        if (err) throw err;
        res.send('Purchase added...');
    });
});

app.get('/getpurchases', (req, res) => {
    let sql = 'SELECT * FROM purchases';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.delete('/deletepurchase/:id', (req, res) => {
    let sql = `DELETE FROM purchases WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Purchase deleted...');
    });
});

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});

