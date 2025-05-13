const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// User Signup
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const checkUser = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUser, [email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (result.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error inserting user' });

        res.status(201).json({
          message: 'User created successfully',
          user: { username, email },
        });
      });
    });
  });
});

// User Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error checking password' });
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      res.status(200).json({ message: 'Login successful', user: results[0] });
    });
  });
});

module.exports = router;
