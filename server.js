const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3307;
const jwtSecret = 'your_jwt_secret_key'; // Change this to a secure key

// Database connection
const db = mysql.createConnection({
    host: '191.101.206.239',
    user: 'root',
    password: 'password', // Update with your database password
    database: 'discord_clone'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, JS)
app.use(express.static('public'));

// User registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send('Server error');

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) return res.status(500).send('Server error');
            res.status(201).send('User registered');
        });
    });
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Server error');

        if (results.length === 0) return res.status(401).send('User not found');

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send('Server error');
            if (!isMatch) return res.status(401).send('Invalid credentials');

            const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
